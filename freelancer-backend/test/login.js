const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /auth/login', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {

    });

    after(function() {

    });

    it('should return token', function() {
        return chai.request(app)
            .post('/auth/login')
            .send({
                email:"test@gmail.com",
                password:"test"
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.token).to.be.an('string');
            });
    });

    it('should return error 404', function() {
        return chai.request(app)
            .post('/auth/login')
            .send({
                email:"test@gmail.com",
                password:"te1t"
            })
            .then(function(res) {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.be.an('string');
            })
            .catch(function(err) {
                    expect(err).to.have.status(400);
            });
    });

    it('should return error that password cannot be empty', function() {
        return chai.request(app)
            .post('/auth/login')
            .send({
                email:"test@gmail.com",
                password:""
            })
            .then(function(res) {
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });

    it('should return error that username cannot be empty', function() {
        return chai.request(app)
            .post('/auth/login')
            .send({
                email:"",
                password:"fsdfsdfsdfsd"
            })
            .then(function(res) {
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });


});