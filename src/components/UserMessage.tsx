'use client'

import { NextFont } from "next/dist/compiled/@next/font";

export default function UserMessage({message, isMe, font}: {message: {user: string; content: string;}, isMe: boolean, font: NextFont}) {
    const myStyle = 'self-end w-fit px-2 py-1 rounded-lg bg-blue-500 text-white'
    const theirStyle = 'w-fit px-2 py-1 rounded-lg bg-white text-black'
    return (
        <div className={(isMe) ? myStyle : theirStyle}>
            <p className={`text-md ${font.className}`} >{message.content}</p>
            <p className={`text-xs ${(isMe) ? 'text-right -mr-1' : 'text-left -ml-1'}`}>{message.user}</p>
        </div>
    )
}