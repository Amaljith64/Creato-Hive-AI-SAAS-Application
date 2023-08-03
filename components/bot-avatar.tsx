import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

const BotAvatar = () => {
  return (
    <Avatar className='h-8 w-8'>
        <AvatarImage className='p-1' src='/logo.png' alt='bot-avatar'/>

    </Avatar>
  )
}

export default BotAvatar
