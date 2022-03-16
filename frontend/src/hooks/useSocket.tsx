import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessage } from '../interfaces/IMessage';
import { frontendEvents, serverEvents } from '../io.events';

const URL = `http://${window.location.hostname}:3333`;

export type ISocketEvent = {};

export const useSocket = () => {
	const [id, setId] = useState('');
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<IMessage[]>([]);

	const addMessage = (message: IMessage) => {
		console.log('add message');
		socket?.emit(frontendEvents.FRONTEND_SEND_MESSAGE, message);
	};

	useEffect(() => {
		setTimeout(() => {
			setId(socket?.id ?? '');
			console.log('connecting');
		}, 1000);

		socket?.on('connect', () => {
			console.log('connecting');
		});
	}, [socket]);

	useEffect(() => {
		// const newSocket = io(URL, { autoConnect: false });
		const newSocket = io(URL);

		setSocket(newSocket);

		newSocket.on(serverEvents.SERVER_BROADCAST_MESSAGE, data => {
			console.log('server sent this data: ', data);
			const newMessage = {
				...data,
				timestamp: new Date(data.timestamp),
			};
			setMessages(m => [...m, newMessage]);
		});

		return () => {
			newSocket.close();
		};
	}, [setSocket]);

	return {
		socket,
		messages,
		socketID: id,
		addMessage,
	};
};
