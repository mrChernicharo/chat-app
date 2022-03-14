import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import { io } from 'socket.io-client';

const socket = io();

ReactDOM.render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>,
	document.getElementById('root')
);
