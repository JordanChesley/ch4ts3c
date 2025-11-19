'use client'

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { use, useState } from "react"

export default function LoginForm() {
    const [useremail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function onLogin(e: React.FormEvent) {
        e.preventDefault()
        let loginStatus = await authClient.signIn.email({
            email: useremail,
            password
        })
        if (!loginStatus.data?.user) {
            setError('Error occurred. Please try again.')
        } else {
            console.log(loginStatus.data.user)
            redirect('/')
        }
    }

    return (
        <form onSubmit={onLogin} className="w-60/100 align-center border-1 border-white rounded-lg p-3 flex flex-col">
            <h1>Login</h1>
            <label htmlFor="useremail">Username / Email</label>
            <input type="text" name="useremail" value={useremail} onChange={(e) => setUserEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}