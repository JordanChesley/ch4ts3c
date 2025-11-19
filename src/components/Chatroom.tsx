'use client'

import { socket } from "@/lib/socket-client";
import { useEffect, useState } from "react"
import UserMessage from "./UserMessage";
import { authClient } from "@/lib/auth-client";

export default function Chatroom({user}:{user: any}) {
    // const session = await (await authClient.getSession()).data
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        // {user: 'Anooki', content: 'THIS IS A NEW SENTENCE WRITTEN IN ALL CAPS THAT\'S DESIGNED TO REALLY FUCK WITH PEOPLE!'},
        {user: 'zeanooki', content: 'Hi'},
        {user: 'Dom', content: 'wassup'},
        {user: 'Dom', content: 'Fire emoji'},
        {user: 'Harry G', content: 'Don\'t even trip dawg'},
        {user: 'zeanooki', content: 'This is a test of the national emergency alert system. This is a test of the national emergency alert system.'},
    ])

    function onMessage(data: {user: string; content: string}) {
        console.log(`New Message: ${data.content}`)
        setMessages(old => [...old, data])
    }

    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        if (message.trim() === '') {
            return
        }
        console.log(`Sending: ${message}`)
        socket.emit('send-message', {user: user.username, content: message})
        setMessage('')
    }

    useEffect(() => {
        if (socket.connected) {
            setConnected(true)
            console.log('CLIENT: Socket Connected!')
            console.log(`Using ${socket.io.engine.transport.name}`)
        } else {
            console.log('CLIENT: Socket disconnected!')
        }
        socket.on('new-message', onMessage)
        return () => {
            socket.off('new-message', onMessage)
        }
    }, [])

    return (
        <div className="w-60/100 h-100 border-2 rounded-lg bg-zinc-500 flex flex-col">
            <div id="messages" className="grow p-2 overflow-scroll flex flex-col gap-2">
                {messages.map((message, index) => (
                    <UserMessage key={index} message={message} isMe={message.user == user.username } />
                ))}
            </div>
            <form onSubmit={sendMessage} id="input-bar" className="bg-yellow-500 px-2 flex flex-row justify-between">
                <input placeholder="Enter message..." value={message} onChange={(e) => setMessage(e.target.value)} className="grow" />
                <button type="submit" className="px-3 cursor-pointer">Send</button>
            </form>
        </div>
    )
}