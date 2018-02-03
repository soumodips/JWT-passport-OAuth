let passport = require("passport");  
let passportJWT = require("passport-jwt");  
let users = require("./users.js");  
let cfg = require("./config.js");  
let ExtractJwt = passportJWT.ExtractJwt;  
let Strategy = passportJWT.Strategy;  
let params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        var user = users[payload.id] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};