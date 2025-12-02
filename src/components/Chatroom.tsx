'use client'

import { socket } from "@/lib/socket-client";
import { useEffect, useRef, useState } from "react"
import UserMessage from "./UserMessage";
import { authClient } from "@/lib/auth-client";
import { catgirlSystem, cryptoCrash } from "@/lib/Fonts";
import { redirect, useRouter } from "next/navigation";

interface Message {
    user: string;
    content: string;
}

export default function Chatroom({user}:{user: any}) {
    const router = useRouter()
    const [forbiddenLanguage, setForbiddenLanguage] = useState<string|null>(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)

    const chatContainerRef = useRef<HTMLDivElement>(null)

    async function onDisconnect(reason: string) {
        if (reason === 'io server disconnect') {
            await authClient.signOut()
            // redirect('/')
            router.refresh()
        }
    }

    function onMessage(data: {user: string; content: string}) {
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
        if (typeof window !== 'undefined') {
            setForbiddenLanguage(localStorage.getItem('forbiddenLanguage'))
        }
        socket.on('new-message', onMessage)
        socket.on('disconnect', onDisconnect)
        return () => {
            socket.off('new-message', onMessage)
            socket.off('disconnect', onDisconnect)
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