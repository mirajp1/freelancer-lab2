const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /api/profile', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {

    });

    after(function() {

    });

    it('should return profile data', function() {
        return chai.request(app)
            .get('/api/profile/1')
            .set('Authorization','JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxNDAwNTk4LCJleHAiOjE1MjE0ODY5OTh9.JsDwrJUgS3JzGiRkdL0KkmBvo_so9p13BhC5mHUnMWc')
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.be.an('string');
            })

    });

    it('should update name', function() {
        return chai.request(app)
            .put('/api/profile')
            .set('Authorization','JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxNDAwNTk4LCJleHAiOjE1MjE0ODY5OTh9.JsDwrJUgS3JzGiRkdL0KkmBvo_so9p13BhC5mHUnMWc')
            .send({
                name:'Miraj Patel1'
            })
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.equal('Miraj Patel1');
            })


    });

    it('should return login error', function() {
        return chai.request(app)
            .get('/api/profile/1')
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.be.an('string');
            })
            .catch(function(err) {
                expect(err).to.have.status(401);
            });

    });

    // // POST - Add new color
    // it('should return error 404', function() {
    //     return chai.request(app)
    //         .post('/auth/login')
    //         .send({
    //             email:"test@gmail.com",
    //             password:"te1t"
    //         })
    //         .then(function(res) {
    //             expect(res).to.have.status(400);
    //             expect(res).to.be.json;
    //             expect(res.body).to.be.an('object');
    //             expect(res.body.error).to.be.an('string');
    //         })
    //         .catch(function(err) {
    //                 expect(err).to.have.status(400);
    //         });
    // });


});