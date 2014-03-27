angular-client-side-auth in Sails framework INCOMPLETE
======================================================

[![Build Status](https://secure.travis-ci.org/MGDSoft/sails_angular-client-side-auth.png)](http://travis-ci.org/MGDSoft/lolreferrals)


This project is a port from https://github.com/fnakstad/angular-client-side-auth (Frederik Nakstad) but in sails v0.10 rc-04

# Start the project locally

```bash
$ git clone https://github.com/MGDSoft/sails_angular-client-side-auth.git
$ rem create config/local and configure your db in models
$ cd sails_angular-client-side-auth
$ npm install && bower install && node app

# Optional

$ configure all apps (Facebook, Twitter, Google, Github, Linkedin)

Be careful, I`m not a expert in node.

This method to authenticate with angularjs (with cookie) its ugly, and if you want use your api for others programs you will need to make changes to the server.

# All pull request are welcome !!