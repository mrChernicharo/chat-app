import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const URL = `http://${window.location.hostname}:3333`;

export type ISocketEvent = {};

export const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [id, setId] = useState('');

	const emit = (name: string, ...args: any) => {
		socket?.emit(name, args);
	};

	const on = (name: string, ...args: any) => {
		socket?.on(name, args);
	};

	useEffect(() => {
		const newSocket = io(URL);
		// const newSocket = io(URL, { autoConnect: false });

		if (newSocket) {
			setSocket(newSocket);

			on('connected', (d: any) => {
				console.log(d);
			});
		}

		return () => {
			newSocket.close();
		};
	}, [setSocket]);

	useEffect(() => {
		setTimeout(() => setId(socket?.id ?? ''), 1000);
	}, [socket]);

	return {
		emit,
		on,
		socket,
		socketID: id,
	};
};
