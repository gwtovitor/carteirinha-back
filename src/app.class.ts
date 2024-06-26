import express from 'express';
import Routes from './routes';
import cors from 'cors';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.set('Content-Type', 'application/json');

    // Configurar CORS
    const corsOptions: cors.CorsOptions = {
      origin: 'http://localhost:3000', // Permitir apenas o domínio do frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    };
    this.app.use(cors(corsOptions));

    const routes = new Routes();
    this.app.use(routes.getAllRoutes());
  }
}
