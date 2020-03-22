import { Controller, Get, Route, Tags } from 'tsoa';
import { dataError, dataSuccess } from '../config/responseCustom';
import { HomeService } from '../services/HomeService';

@Route('/')
@Tags('Home')
export class HomeController extends Controller {
    @Get('')
    public index() {
        try {
            const homeService = new HomeService();
            const result = homeService.getHello();
            return dataSuccess('Ok', result);
        } catch (error) {
            return dataError(error.message || 'Bad request', null);
        }
    }
}
