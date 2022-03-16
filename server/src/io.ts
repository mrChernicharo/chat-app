import express from 'express';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { frontendEvents, serverEvents } from './ioEvent';

config();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	// transports: ['polling'],
	cors: {
		// @ts-ignore
		cors: {
			origin: [CLIENT_URL],
		},
	},
});

io.on(serverEvents.CONNECTION, (socket: Socket) => {
	console.log('a user connected ', socket.id);

	io.emit('connected', {
		serverMessage: socket.id + ' has connected',
	});

	socket.on(frontendEvents.FRONTEND_SEND_MESSAGE, (data: any) => {
		console.log(socket.id, ' sent message ', data);

		// socket.broadcast.emit(serverEvents.SERVER_BROADCAST_MESSAGE, data); // send to all but me
		io.emit(serverEvents.SERVER_BROADCAST_MESSAGE, data); // send to all
	});

	socket.on(serverEvents.DISCONNECT, () => {
		console.log(`socket ${socket.id} disconnected`);
	});
});

export { app, io, server };
