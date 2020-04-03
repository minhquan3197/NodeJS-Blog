import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import { createServer, Server } from 'http';

import config from './config/constants';
import { connectDB } from './config/connectDatabase';
import { initRoutes } from './routes/routes';
import { initPassport } from './middlewares/passport.middleware';
import { ChatEvent } from './helpers/enum.helper';

export class App {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.middlewares();
        this.config(config);
        this.createServer();
        this.sockets();
        this.listen();
        this.connectDb(config);
        initRoutes(this.app);
        initPassport(passport);
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(config: any): void {
        const PORT = config.env_server.port;
        this.port = PORT || 3000;
    }

    private connectDb = (config: any): void => {
        // Database environment
        const DB_CONNECTION = config.env_database.connection;
        const DB_USERNAME = config.env_database.username;
        const DB_PASSWORD = config.env_database.password;
        const DB_HOST = config.env_database.host;
        const DB_NAME = config.env_database.name;
        const DB_PORT = config.env_database.port;
        // Connection string
        const URL = `${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        // Connection Db
        connectDB(URL);
    };

    private middlewares = (): void => {
        this.app.use(passport.initialize());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
    private sockets = (): void => {
        this.io = socketIo(this.server);
    };

    private listen = (): void => {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on(ChatEvent.CONNECT, (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on(ChatEvent.DISCONNECT, () => {
                console.log('Client disconnected');
            });
        });
    };

    public getApp(): express.Application {
        return this.app;
    }
}
