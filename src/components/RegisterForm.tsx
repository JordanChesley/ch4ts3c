'use client'

import { authClient } from "@/lib/auth-client"
import { use, useState } from "react"

export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function onRegister(e: React.FormEvent) {
        e.preventDefault()
        console.log('Registering...')
        let loginStatus = await authClient.signUp.email({
            email,
            username,
            name: username,
            password
        })
        if (!loginStatus.data?.user) {
            setError('Error occurred. Please try again.')
        } else {
            console.log(loginStatus.data.user)
        }
    }

    return (
        <form onSubmit={onRegister} className="w-40/100 align-center border-1 border-white rounded-lg py-3 px-6 flex flex-col">
            <h1 className="text-xl text-center my-4">Register</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="p-3 cursor-pointer">Register</button>
        </form>
    )
}