import { setGlobalState } from './hooks/useGlobal';
import { useSocket } from './hooks/useSocket';
import useUser from './hooks/useUser';
import Router from './router';

export const App = () => {
	const user = useUser();
	const socket = useSocket();
	setGlobalState({ ...user, ...socket });

	return (
		<div>
			<Router />
		</div>
	);
};
