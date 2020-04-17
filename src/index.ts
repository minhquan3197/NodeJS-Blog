import app from './app';
import config from './config/constants';
import { connectDB } from './config/connectDatabase';

// Server environment
const PORT = config.env_server.port;

// Connect database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
