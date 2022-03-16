import { Socket } from 'socket.io-client';
import { IMessage } from '../interfaces/IMessage';
import { IUser } from '../interfaces/IUser';

export interface IGlobalState {
	user: IUser | null;
	messages: IMessage[];
	socket: Socket | null;
	socketID: string;
	updateUser: (user: IUser) => void;
	addMessage: (message: IMessage) => void;
}

const useGlobal: IGlobalState = {
	user: null,
	messages: [],
	socket: null,
	socketID: '',
	updateUser(user) {},
	addMessage(message: IMessage) {},
};

const setGlobalState = (globalData: IGlobalState) => {
	useGlobal.user = globalData.user;
	useGlobal.socket = globalData.socket;
	useGlobal.socketID = globalData.socketID;
	useGlobal.messages = globalData.messages;
	useGlobal.updateUser = globalData.updateUser;
	useGlobal.addMessage = globalData.addMessage;
};

export { useGlobal, setGlobalState };
