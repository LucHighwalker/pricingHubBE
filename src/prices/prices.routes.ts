import * as express from 'express';

import prices from './prices.controller';

class Prices {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.route('/');

		this.router.get('/competitor/:comp', async (req, res) => {
			try {
				const {comp} = req.params;

				const competitor = await prices.competitor(comp);
				res.status(200).json({
					competitor
				});
			} catch (error) {
				res.status(500).json({
					error: error.message
				});
			}
		});
	}
}

export default new Prices().router;
