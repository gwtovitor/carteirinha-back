import express from 'express';

export default class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.set('Content-Type', 'application/json');
        console.log("Teste 🦧🦧🦧🦧")
	}
}

const app = new App()