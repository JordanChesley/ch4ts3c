'use client'

import { socket } from "@/lib/socket-client"
import { useEffect, useState } from "react"

export default function AdminPanel() {
  const [allUsers, setAllUsers] = useState<string[]>([])
  const [numMessages, setNumMessages] = useState(-1)

  function onUserList(data: {users: string[]}) {
    setAllUsers(data.users.sort())
  }

  function onMessageCount(data: {messages: string}) {
    setNumMessages(parseInt(data.messages))
  }

  function disconnectUser(username: string) {
    socket.emit('admin-disconnect-user', {username})
  }

  useEffect(() => {
    socket.on('list-users', onUserList)
    socket.on('admin-count-messages', onMessageCount)
    return () => {
      socket.off('list-users', onUserList)
      socket.off('admin-count-messages', onMessageCount)
    }
  }, [])

  return (
    <div className="flex flex-row justify-center gap-5">
      <div className="border-2 rounded-lg p-4"><h3>Flag</h3><p className="text-xl text-right">{'fit{fake_flag}'}</p></div>
      <div className="border-2 rounded-lg p-4"><h3># Messages</h3><p className="text-xl text-right">{numMessages}</p></div>
      <div className="border-2 rounded-lg p-4"><h3># Users</h3><p className="text-xl text-right">{allUsers.length}</p></div>
    </div>
  )
}