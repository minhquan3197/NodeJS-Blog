import app from './app';
import config from './config/constants';
import { connectDB } from './config/connection';
import Logger from './services/Logger';

// Server environment
const PORT = config.env_server.port;

// Connect database
connectDB();

app.listen(PORT, () => {
    Logger.success(`Server is listening on port ${PORT}`);
});
