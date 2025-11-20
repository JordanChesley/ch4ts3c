'use client'

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
    const [useremail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        let {data, error} = await authClient.signIn.email({
            email: useremail,
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
        <form onSubmit={onLogin} className="w-40/100 align-center border-1 border-white rounded-lg py-3 px-6 flex flex-col">
            <h1 className="text-xl text-center my-4">LogIn</h1>
            <label htmlFor="useremail">UseRNaMe / EmaIL</label>
            <input type="text" name="useremail" value={useremail} onChange={(e) => setUserEmail(e.target.value)} className="border-b-1 border-white outline-none" />
            <label htmlFor="password">PasSwoRD</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-1 border-white outline-none" />
            {error && (<p className="text-red-300 text-md text-center mt-2">{error}</p>)}
            <button type="submit" disabled={loading} className="p-3 cursor-pointer disabled:opacity-50">LoGiN</button>
        </form>
    )
}