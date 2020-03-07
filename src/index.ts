import * as dotenv from 'dotenv';
dotenv.config();

import server from './server';

const port = process.env.PORT || 4200;

server.server.listen(port, (error: Error) => {
	if (error) {
		return console.log(error);
	}

	return console.log(`Server is listening on port: ${port}`);
});

// [TODO] workaround to access connection variable - not ideal will fix later
export default server.conn