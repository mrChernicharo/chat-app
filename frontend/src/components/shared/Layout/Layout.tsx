import { ReactNode } from 'react';
import Header from '../Header';

interface IProps {
	children: ReactNode;
}

export const Layout = ({ children }: IProps) => {
	return (
		<div>
			<Header />

			{children}
		</div>
	);
};
