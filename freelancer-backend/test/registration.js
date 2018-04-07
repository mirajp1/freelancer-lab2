const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /auth/signup', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {

    });

    after(function() {

    });

    it('should return user created', function() {
        return chai.request(app)
            .post('/auth/signup')
            .send({
                email:"tesfsdfearef@gmail.com",
                password:"test121212",
                userType:"work"
            })
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.email).to.equal('tesfsdfearef@gmail.com');
            });
    });


    it('should return error that password empty', function() {
        return chai.request(app)
            .post('/auth/signup')
            .send({
                email:"tesfsdfearef@gmail.com",
                password:"",
                userType:"work"
            })
            .then(function(res) {
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });

    it('should return error that password cannot empty', function() {
        return chai.request(app)
            .post('/auth/signup')
            .send({
                email:"",
                password:"sfdsfdsfd",
                userType:"work"
            })
            .then(function(res) {
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });

    it('should return error that usertype cannot empty', function() {
        return chai.request(app)
            .post('/auth/signup')
            .send({
                email:"sdjfhsdkjf@fjsdfjdksf.com",
                password:"sfdsfdsfd",
                userType:""
            })
            .then(function(res) {
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });


    it('should return error that email should be unique', function() {
        return chai.request(app)
            .post('/auth/signup')
            .send({
                email:"test@gmail.com",
                password:"te1t",
                userType:"work"
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


});