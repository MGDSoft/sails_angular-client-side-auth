var passport = require('passport')
    , userRoles = require('../assets/js/app/routingConfig').userRoles
    , LocalStrategy = require('passport-local').Strategy
    , GitHubStrategy = require('passport-github').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , TwitterStrategy = require('passport-twitter').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , LinkedInStrategy = require('passport-linkedin').Strategy

    ;

/**
 * Copied from https://github.com/stefanbuck/sails-social-auth-example , n1 example stefanbuck!!
 *
 * @param token
 * @param tokenSecret
 * @param profile
 * @param done
 */

var verifyOAuthHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        console.log(profile);

        User.findOne({
                provider: profile.provider,
                uid     : profile.id
            }
        ).done(function (err, user) {

                if (user)
                    return done(null, user);

                var username = profile.username;

                if (!username)
                    username = profile.id;

                var data = {
                    provider: profile.provider,
                    uid     : profile.id,
                    username: username,
                    password: 'PROVIDER'
                };

                User.create(data).done(function (err, user) {

                    if (err) {
                        console.log(err);
                        return done(err, null);
                    }

                    return done(null, user);
                });

            });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    User.findOne({id: id}).done(function (err, user) {
        if (user)
            done(err, user);
        else
            done(err, false);
    });
});

module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            var configLocal = require('./local');

            passport.use(new LocalStrategy(
                function (username, password, done) {

                    var user = User.findOneByUsername(username).done(function (err, user) {
                        if (err)
                            return done(err);

                        else if (!user || user.provider)
                            return done(null, false, { message: 'Incorrect username.' });

                        else if (!user.validPassword(password))
                            return done(null, false, { message: 'Invalid password' });

                        return done(null, user);

                    });
                }
            ));

            passport.use(new FacebookStrategy({
                    clientID    : configLocal.FACEBOOK_APP_ID,
                    clientSecret: configLocal.FACEBOOK_APP_SECRET,
                    callbackURL : configLocal.FACEBOOK_CALLBACK_URL
                },
                verifyOAuthHandler
            ));

            passport.use(new TwitterStrategy({
                    consumerKey   : configLocal.TWITTER_APP_ID,
                    consumerSecret: configLocal.TWITTER_APP_SECRET,
                    callbackURL   : configLocal.TWITTER_CALLBACK_URL
                },
                verifyOAuthHandler
            ));

            passport.use(new GoogleStrategy({
                    clientID    : configLocal.GOOGLE_APP_ID,
                    clientSecret: configLocal.GOOGLE_APP_SECRET,
                    callbackURL : configLocal.GOOGLE_CALLBACK_URL
                },
                verifyOAuthHandler
            ));

            passport.use(new GitHubStrategy({
                    clientID    : configLocal.GITHUB_APP_ID,
                    clientSecret: configLocal.GITHUB_APP_SECRET,
                    callbackURL : configLocal.GITHUB_CALLBACK_URL
                },
                verifyOAuthHandler
            ));

            passport.use(new LinkedInStrategy({
                    consumerKey   : configLocal.LINKEDIN_APP_ID,
                    consumerSecret: configLocal.LINKEDIN_APP_SECRET,
                    callbackURL   : configLocal.LINKEDIN_CALLBACK_URL
                },
                verifyOAuthHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());

            app.use(function (req, res, next) {
                var role = userRoles.public, username = '';

                if (req.user) {
                    role = req.user.role;
                    username = req.user.username;
                }
                res.cookie('user', JSON.stringify({
                    'username': username,
                    'role'    : role
                }));
                next();
            });

        }
    }

};
