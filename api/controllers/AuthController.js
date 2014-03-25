var passport =  require('passport');

/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var loginOAuth = function (req,res,user)
{
    console.log(user);

    req.logIn(user, function (err) {

        if (err) {
            console.log(err);
            res.redirect('/login');
            return;
        }

        res.redirect('/login');
    });
};

module.exports = {

    logout: function(req, res) {
        req.logout();
        res.send(200);
    },

    login: function(req, res, next) {
        passport.authenticate('local', function(err, user) {

            if(err)
                return next(err);

            if(!user)
                return res.send(400);

            req.logIn(user, function(err) {

                console.log("Logged as " + user.username );

                if(err)
                    return next(err);

                if(req.body.rememberme)
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;

                res.json(200, { "role": user.role, "username": user.username });
            });
        })(req, res, next);
    },

    facebook: function (req, res, next) {

        passport.authenticate('facebook', { failureRedirect: '/login'},
            function (err, user) {

                loginOAuth(req,res,user);
            }
        )(req, res, next);
    },

    twitter: function (req, res) {
        passport.authenticate('twitter', { failureRedirect: '/login' },
            function (err, user) {

                loginOAuth(req,res,user);
            }
        )(req, res);
    },

    google: function (req, res) {
        passport.authenticate('google', {
                failureRedirect: '/login',
                scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
            },
            function (err, user) {

                loginOAuth(req,res,user);
            }
        )(req, res);
    },

    github: function (req, res) {
        passport.authenticate('github', { failureRedirect: '/login' },
            function (err, user) {

                loginOAuth(req,res,user);
            }
        )(req, res);
    },

    linkedin: function (req, res) {
        passport.authenticate('linkedin', { failureRedirect: '/login' },
            function (err, user) {

                loginOAuth(req,res,user);
            }
        )(req, res);
    }

};
