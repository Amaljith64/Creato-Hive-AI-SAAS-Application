"use client"

import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'


export const CrispChat = () => {
useEffect(() =>{
    Crisp.configure("5d196b68-81c2-4ccf-b361-ae6e8b0490d8")

},[])

return null
}
