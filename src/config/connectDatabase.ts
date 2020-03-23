import mongoose, { mongo } from 'mongoose';
import bluebird from 'bluebird';

export const connectDB = (connectionString: string) => {
    mongoose.Promise = bluebird;
    let URI = connectionString;
    mongoose
        .connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log('Database connected'))
        .catch(error => {
            console.log(error.message);
            process.exit(1);
        });
};
