import { Controller, Get, Route } from 'tsoa';
import { dataError, dataSuccess } from '../config/responseCustom';
import { HomeService } from '../services/HomeService';

@Route('/')
export class HomeController extends Controller {
    constructor(private readonly homeService: HomeService) {
        super();
    }

    @Get('')
    public index() {
        try {
            const result = this.homeService.getHello();
            return dataSuccess('Ok', result);
        } catch (error) {
            return dataError(error.message || 'Bad request', null);
        }
    }
}
