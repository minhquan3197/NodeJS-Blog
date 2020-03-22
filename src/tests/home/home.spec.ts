import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Test connect', () => {
    beforeEach(done => {
        //Before each test we empty the database in your case
        done();
    });

    describe('GET /api/v1/', () => {
        // Test to get all students record
        it('should get hello world', done => {
            chai.request(app)
                .get('/api/v1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(true);
                    res.body.should.have.property('result_code').eql(200);
                    res.body.should.have.property('message').eql('Ok');
                    res.body.should.have.property('data').eql('Hello, world');
                    done();
                });
        });
    });
});
