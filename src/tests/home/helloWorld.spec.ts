import { HomeService } from '../../services/HomeService';
import { expect } from 'chai';
import 'mocha';

describe('Test connection', () => {
    it('Connect app success', () => {
        const homeService = new HomeService();
        const result = homeService.getHello();
        expect(result).to.equal('Hello, world');
    });
});
