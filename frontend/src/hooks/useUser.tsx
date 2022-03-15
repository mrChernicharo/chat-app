import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';

const useUser = () => {
	const [user, setUser] = useState<IUser | null>(null);

	const updateUser = (userInfo: { username: string }) => {
		const { username } = userInfo;
		setUser({ username });
	};

	useEffect(() => {
		console.log('updated user', user);
	}, [user]);

	return {
		user,
		updateUser,
	};
};

export default useUser;
