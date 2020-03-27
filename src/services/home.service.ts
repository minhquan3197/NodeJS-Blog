export class HomeService {
    constructor() {}

    /**
     * This is function get Hello World
     */
    static async getHello(): Promise<string> {
        return 'Hello, world';
    }
}
