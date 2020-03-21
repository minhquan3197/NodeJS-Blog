import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { RegisterRoutes } from './routes/routes';

class App {
    public app: any;
    constructor() {
        this.app = express();
        this.middlewares();
        RegisterRoutes(this.app);
        this.swagger();
    }

    private middlewares = (): void => {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };

    private swagger = (): void => {
        try {
            const swaggerDocument = require('../dist/swagger.json');
            this.app.use(
                '/docs',
                swaggerUi.serve,
                swaggerUi.setup(swaggerDocument),
            );
        } catch (err) {
            console.log('Unable to load swagger.json', err);
        }
    };
}

export default new App().app;
