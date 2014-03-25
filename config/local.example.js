var constPub  = require('../assets/js/app/constantsPublic')
;

/**
 * Local environment settings
 *
 * While you're DEVELOPING your app, this config file should include
 * any settings specifically for your development computer (db passwords, etc.)
 *
 * When you're ready to deploy your app in PRODUCTION, you can always use this file
 * for configuration options specific to the server where the app will be deployed.
 * But environment variables are usually the best way to handle production settings.
 *
 * PLEASE NOTE:
 *        This file is included in your .gitignore, so if you're using git
 *        as a version control solution for your Sails app, keep in mind that
 *        this file won't be committed to your repository!
 *
 *        Good news is, that means you can specify configuration for your local
 *        machine in this file without inadvertently committing personal information
 *        (like database passwords) to the repo.  Plus, this prevents other members
 *        of your team from commiting their local configuration changes on top of yours.
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#documentation
 */

module.exports = {

    /*
     * sensitive environment variables
     */

    FACEBOOK_APP_ID: '50054793350141',
    FACEBOOK_APP_SECRET: 'b139a470a9600282a4db7247d05e4e07',
    FACEBOOK_CALLBACK_URL: "http://localhost:1337" + constPub.API_VERSION + "/auth/facebook/callback",

    GITHUB_APP_ID: '1cae4459e2583191a',
    GITHUB_APP_SECRET: 'ce392a6e2355cbbed2d5a19057045a44c2c4e',
    GITHUB_CALLBACK_URL: "http://localhost:1337" + constPub.API_VERSION + "/auth/github/callback",

    TWITTER_APP_ID: 'eBqK8Pm9t1231uMZ0omMw',
    TWITTER_APP_SECRET: 'jCWWFBN2G31CE4tpaCWSPKuGqlEuhhUjKSfb3h0',
    TWITTER_CALLBACK_URL: "http://localhost:1337" + constPub.API_VERSION + "/auth/twitter/callback",

    GOOGLE_APP_ID: '6315989631jmgnb3a1kchbdga6q0r49n.apps.googleusercontent.com',
    GOOGLE_APP_SECRET: 'NqSIMRCLVs4eovDQj_dnRiIQ',
    GOOGLE_CALLBACK_URL: "http://localhost:1337" + constPub.API_VERSION + "/auth/google/callback",

    LINKEDIN_APP_ID: '77fy5345il8wx',
    LINKEDIN_APP_SECRET: 'dBswtCRqi4Q2eSlh',
    LINKEDIN_CALLBACK_URL: "http://localhost:1337" + constPub.API_VERSION + "/auth/linkedin/callback",

    // Your SSL certificate and key, if you want to be able to serve HTTP responses
    // over https:// and/or use websockets over the wss:// protocol
    // (recommended for HTTP, strongly encouraged for WebSockets)
    //
    // In this example, we'll assume you created a folder in your project, `config/ssl`
    // and dumped your certificate/key files there:
    // ssl: {
    //   ca: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl_gd_bundle.crt'),
    //   key: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.key'),
    //   cert: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.crt')
    // },

    // The `port` setting determines which TCP port your app will be deployed on
    // Ports are a transport-layer concept designed to allow many different
    // networking applications run at the same time on a single computer.
    // More about ports: http://en.wikipedia.org/wiki/Port_(computer_networking)
    //
    // By default, if it's set, Sails uses the `PORT` environment variable.
    // Otherwise it falls back to port 1337.
    //
    // In production, you'll probably want to change this setting
    // to 80 (http://) or 443 (https://) if you have an SSL certificate

    port: process.env.PORT || 1337,


    // The runtime "environment" of your Sails app is either 'development' or 'production'.
    //
    // In development, your Sails app will go out of its way to help you
    // (for instance you will receive more descriptive error and debugging output)
    //
    // In production, Sails configures itself (and its dependencies) to optimize performance.
    // You should always put your app in production mode before you deploy it to a server-
    // This helps ensure that your Sails app remains stable, performant, and scalable.
    //
    // By default, Sails sets its environment using the `NODE_ENV` environment variable.
    // If NODE_ENV is not set, Sails will run in the 'development' environment.

    environment: process.env.NODE_ENV || 'development'

};