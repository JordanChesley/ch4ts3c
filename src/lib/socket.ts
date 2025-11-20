import { headers } from "next/headers"
import { auth } from "./auth"

export const authenticate = async (socket: any) => {
    let session = await auth.api.getSession({headers: await headers()})
    console.log(session)
    if (!session) return new Error('Unauthenticated')
    socket.data.user = session.user
    return null
}