'use client'

export default function UserMessage({message, isMe}: {message: {user: string; content: string;}, isMe: boolean}) {
    const myStyle = 'self-end w-fit px-2 py-1 rounded-lg bg-blue-500 text-white'
    const theirStyle = 'w-fit px-2 py-1 rounded-lg bg-white text-black'
    return (
        <div className={(isMe) ? myStyle : theirStyle}>
            <p className="text-md">{message.content}</p>
            <span className="text-xs">{message.user}</span>
        </div>
    )
}