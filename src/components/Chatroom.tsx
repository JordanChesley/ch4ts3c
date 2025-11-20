'use client'

import { socket } from "@/lib/socket-client";
import { useEffect, useRef, useState } from "react"
import UserMessage from "./UserMessage";
import { authClient } from "@/lib/auth-client";
import { catgirlSystem, cryptoCrash } from "@/lib/Fonts";

interface Message {
    user: string;
    content: string;
}

export default function Chatroom({user}:{user: any}) {
    const [connected, setConnected] = useState(false)
    const [forbiddenLanguage, setForbiddenLanguage] = useState(localStorage.getItem('forbiddenLanguage'))
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        // {user: 'Anooki', content: 'THIS IS A NEW SENTENCE WRITTEN IN ALL CAPS THAT\'S DESIGNED TO REALLY FUCK WITH PEOPLE!'},
        // {user: 'zeanooki', content: 'Hi'},
        // {user: 'Dom', content: 'wassup'},
        // {user: 'Dom', content: 'Fire emoji'},
        // {user: 'Harry G', content: 'Don\'t even trip dawg'},
        // {user: 'zeanooki', content: 'This is a test of the national emergency alert system. This is a test of the national emergency alert system.'},
    ])
    const [loading, setLoading] = useState(false)

    const chatContainerRef = useRef<HTMLDivElement>(null)

    function onMessage(data: {user: string; content: string}) {
        console.log(`New Message: ${data.content}`)
        setMessages(old => [...old, data])
    }

    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        if (message.trim() === '') {
            return
        }
        socket.emit('send-message', {user: user.username, content: message})
        setMessage('')
        setLoading(false)
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
    }, [socket])

    useEffect(() => {
        if (chatContainerRef.current && (chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop) <= chatContainerRef.current.clientHeight+100) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (!localStorage.getItem('forbiddenLanguage')) {
            localStorage.setItem('forbiddenLanguage', 'false')
        }
    }, [])

    return (
        <div className="w-60/100 h-100 border-2 rounded-lg bg-zinc-500 flex flex-col">
            <div ref={chatContainerRef} id="messages" className="grow p-2 overflow-scroll flex flex-col gap-2">
                {messages.map((message, index) => (
                    <UserMessage key={index} message={message} isMe={message.user == user.username } font={(forbiddenLanguage == 'true') ? catgirlSystem : cryptoCrash} />
                ))}
            </div>
            <form onSubmit={sendMessage} id="input-bar" className="bg-white border-t-1 border-black px-2 flex flex-row justify-between">
                <input placeholder="Enter message..." value={message} onChange={(e) => setMessage(e.target.value)} className={`grow text-black mx-2 outline-none ${(forbiddenLanguage == 'true') ? catgirlSystem.className : cryptoCrash.className}`} />
                <button type="submit" disabled={loading} className="px-3 cursor-pointer bg-blue-300 text-white my-1 rounded-lg border-1 border-black">Send</button>
            </form>
        </div>
    )
}