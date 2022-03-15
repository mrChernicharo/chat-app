import { setGlobalState } from './hooks/useGlobal';
import useUser from './hooks/useUser';
import Router from './router';

export const App = () => {
	const user = useUser();
	setGlobalState({ ...user });

	return (
		<div>
			<Router />
		</div>
	);
};
