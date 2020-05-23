import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';

import { initRoutes } from './routes/routes';
import Response from './middlewares/Response';
import ErrorHandler from './middlewares/errors';

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.middlewares();
        initRoutes(this.app);
        this.app.use(Response);
        this.app.use(ErrorHandler);
    }

    private middlewares = (): void => {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('combined'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
}

export default new App().app;
