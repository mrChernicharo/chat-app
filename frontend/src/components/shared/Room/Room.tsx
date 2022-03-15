import { FormEvent, ReactNode, useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessage } from '../../../interfaces/Message';

interface IProps {}

export const Room = ({}: IProps) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3333`);
		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [setSocket]);

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
	return (
		<div>
			<h3>Room</h3>

			<ul>
				{messages.map(msg => (
					<li>
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
