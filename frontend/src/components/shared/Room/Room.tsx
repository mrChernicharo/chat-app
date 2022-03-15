import { nanoid } from 'nanoid';
import { FormEvent, ReactNode, useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSocket } from '../../../hooks/useSocket';
import { IMessage } from '../../../interfaces/IMessage';

interface IProps {}

// const URL = `http://${window.location.hostname}:3333`;

export const Room = ({}: IProps) => {
	const { socketID, emit } = useSocket();

	const [messages, setMessages] = useState<IMessage[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const connectionIndicator = {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: socketID ? 'forestgreen' : 'crimson',
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const text = inputRef.current?.value.trim();
		if (!text) return;

		const newMessage = { text, timestamp: new Date() };

		console.log({ text, e, newMessage });
		setMessages([...messages, newMessage]);

		emit('message', newMessage);
	};

	return (
		<div>
			<h3>Room</h3>
			<div style={connectionIndicator}></div>
			{socketID && <p>socketID: {socketID}</p>}
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
