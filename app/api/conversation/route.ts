import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req:Request
){
    try{
        const {userId} = auth()
        const body = await req.json();
        const { messages } = body

        if (!userId){
            return new NextResponse("Unauthorized",{status:401});
        }

        if (!configuration.apiKey){
            return new NextResponse("Open AI key not configured",{status:500});
        }

        if (!messages){
            return new NextResponse("Message is required",{status:400});
        }

        const freeTrail = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTrail && !isPro) {
            return new NextResponse("Free trail has expired",{status:403});
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
            
        })

        if(!isPro){

            await increaseApiLimit()
        }


        return NextResponse.json(response.data.choices[0].message)
    }catch (error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error",{status:500});
    }
}