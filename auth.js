let passport = require("passport");  
let passportJWT = require("passport-jwt");  
let users = require("./users.js");  
let cfg = require("./config.js");  
let ExtractJwt = passportJWT.ExtractJwt;  
let Strategy = passportJWT.Strategy;  
let opts = {}
opts.secretOrKey= cfg.jwtSecret
opts.jwtFromRequest= ExtractJwt.fromAuthHeaderWithScheme(cfg.authScheme)

module.exports = function() {  
    var strategy = new Strategy(opts, function(payload, done) {

        var user =users.filter(function(user) {
            return user.id === payload.id
        });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or model a new user
            }
     });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate(cfg.authScheme, cfg.jwtSession);
        }
    };
};