import { Socket } from 'socket.io-client';
import { IUser } from '../interfaces/IUser';

export interface IGlobalState {
	user: IUser | null;
	updateUser: (user: IUser) => void;
	emit: (name: string, ...args: any) => void;
	on: (name: string, ...args: any) => void;
	socket: Socket | null;
	socketID: string;
}

const useGlobal: IGlobalState = {
	user: null,
	updateUser(user) {
		this.user = user;
	},
	emit(name: string, ...args: any) {},
	on(name: string, ...args: any) {},
	socket: null,
	socketID: '',
};

const setGlobalState = (globalData: IGlobalState) => {
	useGlobal.user = globalData.user;
	useGlobal.updateUser = globalData.updateUser;
	useGlobal.emit = globalData.emit;
	useGlobal.on = globalData.on;
	useGlobal.socket = globalData.socket;
	useGlobal.socketID = globalData.socketID;
};

export { useGlobal, setGlobalState };
