import express from 'express';
import Routes from './routes';
import cors from 'cors';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.set('Content-Type', 'application/json');

    const corsOptions: cors.CorsOptions = {
      origin: ['https://carteirinha-front-rirawl8kz-gwtovitors-projects.vercel.app', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
    this.app.use(cors(corsOptions));

    const routes = new Routes();
    this.app.use(routes.getAllRoutes());
  }
}
