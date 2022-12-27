const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const PORT = 3000 || process.env.PORT
const botName = 'ChatcordBot'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// SET STATIC FOLDER TO BE ABLE TO ACCESS IT
app.use(express.static(path.join(__dirname, 'public')))

// Run when a client connects
io.on('connection', socket => {
    // socket.emit() => Sends a message only to the connected client 
    // socket.broadcast.emit() => Sends a message to all connected clients except the current client 
    // io.emit() => Sends a message to all connected clients including the current one 
    
    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Chatcord!'))

    // Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'))

    // Runs when client diconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'))
    })

    // Listen to chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg))
    })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))