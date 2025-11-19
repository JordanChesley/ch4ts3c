'use client'

import { authClient } from "@/lib/auth-client"
import { socket } from "@/lib/socket-client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function RoomInfo({user}:{user:any}) {
    // const user = await authClient.getSession()
    const [users, setUsers] = useState([
        'Anooki',
        'Dom',
        'Harry G',
    ])

    function onUserJoined() {
        console.log('User joined.')
    }

    function onUserLeft() {
        console.log('User left.')
    }

    function onLogout() {
        authClient.signOut()
        redirect('/')
    }

    useEffect(() => {
        socket.on('user-joined', onUserJoined)
        socket.on('user-left', onUserLeft)

        return () => {
            socket.off('user-joined', onUserJoined)
            socket.off('user-left', onUserLeft)
        }
    }, [])

    return (
        <div className="w-15/100 h-100">
            {/* User List */}
            <div className="h-72/100 border-2 rounded-lg p-2">
            {
                users.map((username, index) => (
                    <p key={index}>{username}</p>
                ))
            }
            </div>
            {/* Spacer */}
            <div className="h-3/100"></div>
            {/* My Info */}
            <div className="h-25/100 border-2 rounded-lg flex flex-col justify-center items-center">
                <p className="w-80/100 py-3 text-lg font-bold">Anooki</p>
                <button onClick={onLogout} className="w-90/100 px-3 py-1 bg-blue-300 rounded-lg cursor-pointer">Logout</button>
            </div>
        </div>
    )
}