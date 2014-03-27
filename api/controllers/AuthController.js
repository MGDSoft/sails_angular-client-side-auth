var passport =  require('passport');

/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    logout: function(req, res) {
        req.logout();
        res.send(200);
    },

    login: function(req, res, next) {

        passport.authenticate('local', function(err, user) {

            if(err)
                return res.serverError(err);

            if(!user)
                return res.badRequest('user not found');

            req.logIn(user, function(err) {

                sails.log.info("Logged as " + user.username );

                if(err)
                    return res.badRequest(err);

                if(req.body.rememberme)
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;

                res.json(200, { "role": user.role, "username": user.username });
            });
        })(req, res, next);
    },

    oauth: function (req, res, next) {

        var provider=req.param('provider')
            ,providers=['facebook','twitter','google','github','linkedin']
            ,providerId=providers.indexOf(provider)
        ;

        if (!provider || providerId === -1)
            return res.notFound();

        provider = providers[providerId];

        // eval cant be dangerous because the provider value is obtained from providers array
        /* jshint ignore:start */
        if (eval("typeof sails.config."+provider.toUpperCase() + "_APP_ID == 'undefined'")
                || eval("typeof sails.config."+provider.toUpperCase() + "_APP_SECRET == 'undefined'")
            ){

            return res.serverError("Details of "+provider+" application not has been created in the conf/local file");
        }


        return eval(provider + "(req, res, next)");
        /* jshint ignore:end */


        function facebook (req, res, next) {

            passport.authenticate('facebook', { failureRedirect: '/login'},
                function (err, user) {

                    loginOAuth(req,res,user);
                }
            )(req, res, next);
        }

        function twitter (req, res) {

            passport.authenticate('twitter', { failureRedirect: '/login' },
                function (err, user) {

                    loginOAuth(req,res,user);
                }
            )(req, res);
        }

        function google(req, res) {

            passport.authenticate('google', {
                    failureRedirect: '/login',
                    scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
                },
                function (err, user) {

                    loginOAuth(req,res,user);
                }
            )(req, res);
        }

        function github(req, res) {

            passport.authenticate('github', { failureRedirect: '/login' },
                function (err, user) {

                    loginOAuth(req,res,user);
                }
            )(req, res);
        }

        function linkedin(req, res) {

            passport.authenticate('linkedin', { failureRedirect: '/login' },
                function (err, user) {

                    loginOAuth(req,res,user);
                }
            )(req, res);
        }

        function loginOAuth(req,res,user){

            req.logIn(user, function (err) {

                if (err) {
                    sails.log.error(err);
                    res.redirect('/login');
                    return;
                }

                sails.log.info("Logged as " + user.username );

                return res.redirect('/login');
            });
        }
    }



};
