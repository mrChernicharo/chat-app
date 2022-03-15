// import io from 'socket.io'

import { Socket } from "socket.io"

const io = require('socket.io')(3333, {
    cors:{
        origin: ['http://localhost:3000']
    }
})

io.on('connection', (socket: Socket) => {
    console.log('new user connected. id: ', socket.id ,'at', new Date().toLocaleTimeString())

    socket.on('message', (data) => {
        console.log(data)
    })
})
