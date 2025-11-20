'use client'

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { use, useState } from "react"

export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onRegister(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        let {data, error} = await authClient.signUp.email({
            email,
            username,
            name: username,
            password
        })
        if (data) {
            console.log(data.user)
            redirect('/')
        } else if (error) {
            setError(error.message + '.' || 'An error occurrsed. Please try again.')
        } else {
            setError('An error occurred. Please try again.')
        }
        setLoading(false)
    }

    return (
        <form onSubmit={onRegister} className="w-40/100 align-center border-1 border-white rounded-lg py-3 px-6 flex flex-col">
            <h1 className="text-xl text-center my-4">ReGIstER</h1>
            <label htmlFor="username">UsErnAMe</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-b-1 border-white outline-none" />
            <label htmlFor="email">EmAIl</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-b-1 border-white outline-none" />
            <label htmlFor="password">PasSwORd</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-1 border-white outline-none" />
            {error && (<p className="text-red-300 text-md text-center mt-2">{error}</p>)}
            <button type="submit" disabled={loading} className="p-3 cursor-pointer disabled:opacity-50">ReGIsTeR</button>
        </form>
    )
}