import { app, server } from './io'
import { config } from 'dotenv';

const PORT = process.env.PORT || 3333

app.get('/', (req, res) => {
	console.log(config())
	res.send(`<h1>Welcome</h1>`);
});

server.listen(PORT, () => console.log(`Listening to port ${PORT}`));
