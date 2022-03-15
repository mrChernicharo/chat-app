import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
	transports: ['polling'],
	cors: {
		// @ts-ignore
		cors: {
			origin: [`http://localhost:3000`],
		},
	},
});

io.on('connection', socket => {
	console.log('a user connected ', socket.id);

	socket.emit('connected', { serverMessage: socket.id + ' has connected' });

	socket.on('message', data => {
		console.log(socket.id, ' sent message ', data);
	});

	socket.on('disconnect', () => {
		console.log(`socket ${socket.id} disconnected`);
	});
});


export { app, io, server }