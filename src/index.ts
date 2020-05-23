import app from './app';
import Logger from './config/logger';
import config from './config/constants';
import { connectDB } from './config/connection';

// Server environment
const PORT = config.envServer.port;

// Connect database
connectDB();

app.listen(PORT, () => {
    Logger.success(`Server is listening on port ${PORT}`);
});
