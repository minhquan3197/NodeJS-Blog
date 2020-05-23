import BaseService from './BaseService';

class HomeService extends BaseService {
    private static instance: HomeService;

    constructor() {
        super();
    }

    public static get getInstance(): HomeService {
        if (!HomeService.instance) {
            HomeService.instance = new HomeService();
        }
        return HomeService.instance;
    }

    /**
     * This is function get Hello World
     */
    getHello(): string {
        return 'Hello, world';
    }
}
export default HomeService.getInstance;
