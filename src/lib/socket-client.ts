'use client'

import { io } from 'socket.io-client'
import { authClient } from './auth-client'

export const socket = io({withCredentials: true, query:{username: (await authClient.getSession()).data?.user.username}})