import { Link } from 'react-router-dom';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/login', name: 'Login' },
];

export const Header = () => {
	return (
		<header>
			{pages.map(page => (
				<Link key={page.name} to={page.path}>
					{page.name}
				</Link>
			))}
		</header>
	);
};
