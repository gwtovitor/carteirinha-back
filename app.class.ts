import express from 'express';
import Routes from 'src/routes';

export default class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.set('Content-Type', 'application/json');

		const routes = new Routes();
		this.app.use(routes.getAllRoutes());
	}
}
