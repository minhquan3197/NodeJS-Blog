import { Controller, Route, Post, Body, SuccessResponse } from 'tsoa';
import { dataError, dataSuccess } from '../config/responseCustom';
import { Login } from '../interfaces/Auth';

@Route('auth')
export class AuthController extends Controller {
    @SuccessResponse('201', 'Created')
    @Post('login')
    public async login(@Body() req: Login): Promise<any> {
        try {
            console.log(req);
            return dataSuccess('Ok', 'Hello, World', 201);
        } catch (error) {
            return dataError(error.message || 'Bad request', null, 400);
        }
    }
}
