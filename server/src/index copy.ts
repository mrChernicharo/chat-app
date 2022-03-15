import express from 'express';
// import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
// app.use(cors());

const server = createServer(app);
const io = new Server(server, {
	cors: { origin: [`http://localhost://3000`, `http://localhost://3333`] },
});

app.get('/', (req, res) => {
	res.sendFile(`<h1>Welcome</h1>`);
});

io.on('connection', socket => {
	console.log(`A user connected`);
});

server.listen(3333, () => console.log('Listening to port 3333'));
