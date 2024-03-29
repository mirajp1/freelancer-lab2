const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /api/projects/bid', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {

    });

    after(function() {

    });

    it('should return that bid was placed', function() {
        return chai.request(app)
            .post('/api/projects/8/bid')
            .set('Cookie','connect.sid=s%3AHdHPzLAs4W9ebMuS1y1oVY_ugB64IoLd.oSfjgWv222L18JZLDqF8wAcH3y99I5zaYHUoNMA0APk')
            .send({
                days:1,
                bid_amount:50
            })
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.days).to.equal('1');
                expect(res.body.bid_amount).to.equal('50');
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });

    });


    it('should return can not place bid again on same project', function() {
        return chai.request(app)
            .post('/api/projects/1/bid')
            .set('Cookie','connect.sid=s%3AHdHPzLAs4W9ebMuS1y1oVY_ugB64IoLd.oSfjgWv222L18JZLDqF8wAcH3y99I5zaYHUoNMA0APk')
            .send({
                days:1,
                bid_amount:50
            })
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.days).to.equal('1');
                expect(res.body.bid_amount).to.equal('50');
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });

    });


    // it('should update name', function() {
    //     return chai.request(app)
    //         .put('/api/profile')
    //         .set('Cookie','connect.sid=s%3AHdHPzLAs4W9ebMuS1y1oVY_ugB64IoLd.oSfjgWv222L18JZLDqF8wAcH3y99I5zaYHUoNMA0APk')
    //         .send({
    //             name:'Miraj Patel1'
    //         })
    //         .then(function(res) {
    //             expect(res).to.have.status(200);
    //             expect(res).to.be.json;
    //             expect(res.body).to.be.an('object');
    //             expect(res.body.name).to.equal('Miraj Patel1');
    //         })
    //
    //
    // });




});