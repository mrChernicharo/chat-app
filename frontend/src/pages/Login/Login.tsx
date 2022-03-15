import { FormEvent, useRef } from 'react';
import Layout from '../../components/shared/Layout';

export const Login = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const username = inputRef.current?.value.trim();

		console.log(username);
	}

	return (
		<Layout>
			<h3>Login</h3>

			<p>Identifique-se</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input id="username" ref={inputRef} type="text" />

				<button>Send</button>
			</form>
		</Layout>
	);
};
