import * as express from 'express';

import prices from './prices.controller';

class Prices {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.route('/');

		this.router.get('/competitor_list', async (req, res) => {
			try {
				const competitor = await prices.competitorList();
				res.status(200).json({
					competitor
				});
			} catch (error) {
				res.status(500).json({
					error: error.message
				});
			}
		});

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

		this.router.put('/competitor/:comp', async (req, res) => {
			try {
				const {comp} = req.params;
				const {date, price} = req.body;

				const competitor = await prices.addPrice(comp, date, price);
				res.status(200).json({
					competitor
				});
			} catch (error) {
				res.status(500).json({
					error: error.message
				});
			}
		});

		this.router.get('/competitor/', async (req, res) => {
			try {
				const competitor = await prices.getAll();
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
