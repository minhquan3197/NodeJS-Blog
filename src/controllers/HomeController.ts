import { Controller, Get, Route } from 'tsoa';
import { dataError, dataSuccess } from '../config/responseCustom';

@Route('/')
export class HomeController extends Controller {
    @Get('')
    public index() {
        try {
            return dataSuccess('Ok', 'Hello, World');
        } catch (error) {
            return dataError(error.message || 'Bad request', null);
        }
    }
}
