import os from 'os';
import express from 'express';
import cluster from 'cluster';
import fibonacci from './fibonacci';

const totalCPUs = os.cpus().length;

// Create cluster with number process in CPU
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
    // Listen cluster on one port
    const app = express();

    app.get('/', (req: express.Request, res: express.Response) => {
        const numberRequest: any = req.query.number || '';
        console.log(`Worker Process Id - ${cluster.worker.process.pid} has accepted the request`);
        let number = fibonacci.calcuateFibonacciValue(Number.parseInt(numberRequest));
        res.send(`${number}`);
    });

    app.listen(3000, () => console.log('App running on PORT: 3000'));
}
