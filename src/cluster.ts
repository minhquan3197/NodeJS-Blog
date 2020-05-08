import os from 'os';
import cluster from 'cluster';

import app from './app';
import config from './config/constants';
import { connectDB } from './config/connect_database';

// Connect database
connectDB();
// Count CPU
const totalCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Total number of CPUs Count is ${totalCPUs}`);
    for (let index = 0; index < totalCPUs; index++) {
        cluster.fork();
    }
    cluster.on('online', worker => {
        console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
    });
    cluster.on('exit', worker => {
        console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid} is offline`);
        cluster.fork();
    });
} else {
    // Server environment
    const PORT = config.env_server.port;

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}
