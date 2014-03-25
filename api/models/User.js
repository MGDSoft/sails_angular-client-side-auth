var bcrypt = require('bcrypt')
    , userRoles = require('../../assets/js/app/routingConfig').userRoles
    ;

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        username: {
            type    : 'string',
            required: true,
            unique  : true
        },

        password: {
            type    : 'string',
            required: true
        },

        role: {
            type      : 'json',
            defaultsTo: JSON.stringify(userRoles.user)
        },

        uid: {
            type: 'string'
        },

        provider: {
            type: 'string'
        },

        // Override toJSON instance method
        // to remove password value
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.uid;
            delete obj.provider;
            return obj;
        },

        validPassword: function (password) {

            return bcrypt.compareSync(password, this.password);
        }

    },

    beforeCreate: function (values, next) {

        if (values.provider)
            return next();

        bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
            if (err)
                return next(err);

            values.password = encryptedPassword;
            return next();
        });

    }

};