var supertest = require("supertest")
    ,Sails = require('sails/lib/app')
    ,sails = new Sails();
;
//var sails =require('sails');

before(function(done) {

    // Lift Sails and store the app reference
    sails.lift({

        // turn down the log level so we can view the test results
        log: {
            level: 'debug'
        },
        connection: {
            default: 'test'
        },
        port: 4000

    }, function(err, sails) {

        // export properties for upcoming tests with supertest.js
        sails.localAppURL = localAppURL = ( sails.usingSSL ? 'https' : 'http' ) + '://' + sails.config.host + ':' + sails.config.port + '';
        // save reference for teardown function
        done(err);
    });

});

// After Function
after(function(done) {
    sails.lower(done);
});


describe('HTTP Sails Test:', function () {
    describe('HTTP SuperTests:', function () {

        it ('should request "/" on server', function (done) {
            supertest(sails.express.app)
                .get('/')
                .expect(200, done);
        }),

        it ('should request "/foo" on server', function (done) {
            supertest(sails.express.app)
                .get('/foo')
                .expect(200, done)
        })

    });
});