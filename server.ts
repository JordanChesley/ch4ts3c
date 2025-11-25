import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'
import { Filter } from 'bad-words';

interface Message {
  user: string;
  content: string;
}

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

// Persistent data.
const users: string[] = []
const messages: Message[] = []

// Decent word filter.
const filter = new Filter()
filter.addWords('nig', 'rape', 'raper', 'rapist')
filter.removeWords('damn', 'hell', 'balls')

// IO Handler.
app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    // Only accept connections with a username.
    if (!socket.handshake.query.username) {
      return socket.disconnect(true)
    }

    // Add username to user list, if not in it already.
    socket.data.username = socket.handshake.query.username
    let index = users.indexOf(socket.data.username)
    if (index == -1) users.push(socket.data.username)

    // Broadcast updated user list.
    io.emit('list-users', {users})
    io.emit('admin-count-messages', {messages: messages.length})

    // Send all previous messages to new user.
    for (let message of messages) {
      socket.emit('new-message', message)
    }

    socket.on('disconnect', () => {
      // Remove user from user list, if in it.
      let index = users.indexOf(socket.data.username)
      if (index != -1) users.splice(index, 1)

      // Broadcast updated user list.
      io.emit('list-users', {users})
    })

    // Broadcast new messages to all users.
    socket.on('send-message', (data) => {
      // Only accept messages that don't contain a banned word.
      messages.push({user: socket.data.username, content: filter.clean(data.content)})
      console.log(`${socket.data.username}: ${filter.clean(data.content)}`)
      io.emit('new-message', {user: socket.data.username, content: filter.clean(data.content)})
      io.emit('admin-count-messages', {messages: messages.length})
    })

    // Disconnect users from admin panel.
    socket.on('admin-disconnect-user', async (data) => {
      console.log(`Disconnecting ${data.username}`)
      let sockets = await io.fetchSockets()
      for (let s of sockets) {
        if (s.data.username == data.username) {
          return s.disconnect(true)
        }
      }
    })
  })

// Server.
httpServer
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  });
});