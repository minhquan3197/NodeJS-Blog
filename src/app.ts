import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { initRoutes } from './routes/routes';

class App {
    public app: any;
    constructor() {
        this.app = express();
        this.middlewares();
        initRoutes(this.app);
    }

    private middlewares = (): void => {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
}

export default new App().app;
