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
            let swaggerDocument = require('../dist/swagger.json');
            let urlHost = swaggerDocument.servers[0].url;
            if (urlHost.includes('https')) {
                swaggerDocument.servers[0].url = urlHost.replace(
                    /^https:\/\//i,
                    'http://',
                );
            }
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
