import { FormEvent, useRef } from 'react';
import Layout from '../../components/shared/Layout';
import { useGlobal } from '../../hooks/useGlobal';

export const Login = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { user, updateUser } = useGlobal;

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const username = inputRef.current?.value.trim();
		if (!username) return;

		updateUser({ username });
	}

	return (
		<Layout>
			<h3>Login</h3>

			{user ? <p>Boas vindas: {user.username}</p> : <p>Identifique-se</p>}

			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input id="username" ref={inputRef} type="text" />

				<button>Send</button>
			</form>
		</Layout>
	);
};
