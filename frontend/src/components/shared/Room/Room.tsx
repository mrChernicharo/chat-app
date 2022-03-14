import { FormEvent, ReactNode, useRef, useState } from 'react';
import { IMessage } from '../../../interfaces/Message';
import Header from '../Header';

interface IProps {}

export const Room = ({}: IProps) => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const text = inputRef.current?.value.trim();
		console.log({ text, e });

		if (!text) return;

		const newMessage = { timestamp: new Date(), text };
		setMessages([...messages, newMessage]);
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
