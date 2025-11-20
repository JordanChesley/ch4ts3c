'use client'

import { authClient } from "@/lib/auth-client"
import { socket } from "@/lib/socket-client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function RoomInfo({user}:{user:any}) {
    const [users, setUsers] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    function onListUsers(data: {users: string[]}) {
        setUsers(data.users.sort())
    }

    async function onLogout() {
        setLoading(true)
        socket.disconnect()
        await authClient.signOut()
        redirect('/')
    }

    useEffect(() => {
        // socket.on('user-joined', onUserJoined)
        // socket.on('user-left', onUserLeft)
        socket.on('list-users', onListUsers)

        return () => {
            // socket.off('user-joined', onUserJoined)
            // socket.off('user-left', onUserLeft)
            socket.off('list-users', onListUsers)
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
                <p className="w-80/100 py-3 text-lg font-bold">{user.username}</p>
                <button onClick={onLogout} disabled={loading} className="w-90/100 px-3 py-1 bg-blue-300 rounded-lg cursor-pointer border-1 border-white disabled:opacity-50">LOgoUT</button>
            </div>
        </div>
    )
}