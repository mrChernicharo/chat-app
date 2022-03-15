import { IUser } from '../interfaces/IUser';

export interface IGlobalState {
	user: IUser | null;
	updateUser: (user: IUser) => void;
}

const useGlobal: IGlobalState = {
	user: null,
	updateUser(user) {
		this.user = user;
	},
};

const setGlobalState = (globalData: IGlobalState) => {
	useGlobal.user = globalData.user;
	useGlobal.updateUser = globalData.updateUser;
};

export { useGlobal, setGlobalState };
