import {app, server } from './io'

app.get('/', (req, res) => {
	res.send(`<h1>Welcome</h1>`);
});

server.listen(3333, () => console.log('Listening to port 3333'));
