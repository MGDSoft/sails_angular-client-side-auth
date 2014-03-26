var supertest = require("supertest")
    ,passportStub = require('passport-stub')
;

// user account
var user = {
    'username':'newUserRole',
    'role':{bitMask: 2,title: "user"},
    'password':'12345'
};

// user account 2 - no role
var user2 = {
    'username':'newUser',
    'password':'12345'
};

// admin account
var admin = {
    'username':'admin',
    'role': { bitMask: 4, title: 'admin' },
    'password':'123'
};

describe('HTTP Sails Test:', function () {
    describe('HTTP SuperTests:', function () {

        before(function(){
            passportStub.install(sails.hooks.http.app);
        });

        afterEach(function() {
            passportStub.logout(); // logout after each test
        });

        it ('should request "/" on server', function (done) {
            supertest(sails.hooks.http.app).get('/').expect(200, done);
        });

        it('Logout - Return a 200', function(done) {
            supertest(sails.hooks.http.app).post('/v1/auth/logout').expect(200, done);
        });

        it('As a Logout user, on /users - Return a 403', function(done) {
            supertest(sails.hooks.http.app).get('/v1/user').expect(403, done);
        });

        it('Register a new user(no role) - Return a 201', function(done) {
            supertest(sails.hooks.http.app).post('/v1/user/create').send(user2).expect(201, done);
        });

        it('Register a new user - Return a 201', function(done) {
            supertest(sails.hooks.http.app).post('/v1/user/create').send(user).expect(201, done);
        });

        it('As a normal user, on /users - Return a 403', function(done) {
            passportStub.login(user); // login as user
            supertest(sails.hooks.http.app).get('/v1/user').expect(403, done);
        });

        it('As a Admin user, on /users - Return a 200', function(done) {
            passportStub.login(admin); // login as admin
            supertest(sails.hooks.http.app).get('/v1/user').expect(200, done);
        });

        it('Register a new admin user - Return a 201', function(done) {
            supertest(sails.hooks.http.app).post('/v1/user/create').send(admin).expect(201, done);
        });

        it('Login as Admin - Return a 200', function(done) {
            supertest(sails.hooks.http.app).post('/v1/auth/login').send(admin).expect(200, done);
        });
    });
});






