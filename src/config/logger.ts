import chalk from 'chalk';

class Logger {
    private static instance: Logger;

    /* eslint-disable */
    private constructor() {}

    public static get getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public success(content: any) {
        console.log(chalk.bgGreen.black(content));
    }

    public error(content: any) {
        console.log(chalk.bgRed.black(content));
    }
}

export default Logger.getInstance;
