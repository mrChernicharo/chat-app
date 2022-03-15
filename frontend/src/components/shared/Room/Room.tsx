import { nanoid } from 'nanoid';
import { FormEvent, ReactNode, useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessage } from '../../../interfaces/Message';

interface IProps {}

const URL = `http://${window.location.hostname}:3333`;

export const Room = ({}: IProps) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [socketId, setSocketId] = useState('');
	const [messages, setMessages] = useState<IMessage[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const text = inputRef.current?.value.trim();
		console.log({ text, e });

		if (!text) return;

		const newMessage = { timestamp: new Date(), text };
		setMessages([...messages, newMessage]);

		socket?.emit('message', newMessage);
	}

	useEffect(() => {
		const newSocket = io(URL);
		// const newSocket = io(URL, { autoConnect: false });

		if (newSocket) {
			setSocket(newSocket);

			newSocket.on('connected', d => {
				console.log(d);
			});

			// newSocket.onAny((event, ...args) => {
			// 	console.log({event, ...args})
			// })
		}

		return () => {
			newSocket.close();
		};
	}, [setSocket]);

	useEffect(() => {
		setTimeout(() => setSocketId(socket?.id ?? ''), 1000);
	}, [socket]);

	return (
		<div>
			<h3>Room</h3>
			<p>socketID: {socketId}</p>
			<ul>
				{messages.map(msg => (
					<li key={nanoid()}>
						{msg.text} {msg.timestamp.toLocaleDateString()}{' '}
						{msg.timestamp.toLocaleTimeString()}
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type="text" />
				<button>Send</button>
			</form>
		</div>
	);
};
