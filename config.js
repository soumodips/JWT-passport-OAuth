const SECRETKEY = 'jwtsecretkey123'
const EXPIRESIN = '5h'

module.exports = {  
    jwtSecret: SECRETKEY,
    jwtSession: {
        session: false
    },
    expiresIn : EXPIRESIN
};