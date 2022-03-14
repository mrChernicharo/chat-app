import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req,res) => {
    res.send(`<h1>Hey</h1>`)
})

io.on('connection', socket => {
    console.log(`A user connected`)
})

server.listen(8080, () => console.log('Listening to port 8080'))