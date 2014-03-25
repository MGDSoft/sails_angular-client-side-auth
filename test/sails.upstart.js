/*
 Global before() and after() launcher for Sails application
 to run tests like Controller and Models test
 */

//before(function(done) {
//    var jacinto = "";
//    console.log("TROLLER");
//    // Lift Sails and store the app reference
//    require('sails').lift({
//
//        // turn down the log level so we can view the test results
//        log: {
//            level: 'error'
//        },
//        connection: {
//            default: 'test'
//        },
//        port: 4000
//
//    }, function(err, sails) {
//        // export properties for upcoming tests with supertest.js
//        sails.localAppURL = localAppURL = ( sails.usingSSL ? 'https' : 'http' ) + '://' + sails.config.host + ':' + sails.config.port + '';
//        // save reference for teardown function
//        done(err);
//    });
//
//});
//
//// After Function
//after(function(done) {
//    sails.lower(done);
//});