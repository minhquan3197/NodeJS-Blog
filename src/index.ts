import app from './app';
import config from './config/constants';
import { connectDB } from './config/connectDatabase';

// Server environment
const PORT = config.env_server.port;

// Database environment
const DB_CONNECTION = config.env_database.connection;
const DB_USERNAME = config.env_database.username;
const DB_PASSWORD = config.env_database.password;
const DB_HOST = config.env_database.host;
const DB_NAME = config.env_database.name;
const DB_PORT = config.env_database.port;

// Connection string
const URL = `${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Connect database
connectDB(URL);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
