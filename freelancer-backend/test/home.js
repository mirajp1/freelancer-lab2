const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /api/projects for home', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {

    });

    after(function() {

    });

    it('should return profile data', function() {
        return chai.request(app)
            .get('/api/projects/all/open')
            .set('Cookie','connect.sid=s%3AHdHPzLAs4W9ebMuS1y1oVY_ugB64IoLd.oSfjgWv222L18JZLDqF8wAcH3y99I5zaYHUoNMA0APk')
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            })

    });



    it('should return unauthroized access', function() {
        return chai.request(app)
            .get('/api/projects/all/open')
            .then(function(res) {

            })
            .catch(function(err) {
                expect(err).to.have.status(401);
            });

    });




});