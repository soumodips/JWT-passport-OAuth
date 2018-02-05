let express = require("express")
let passport = require("passport")
let bodyParser = require("body-parser") 
let jwt = require("jwt-simple")
let auth = require("./auth.js")()
let users = require("./users.js")
let cfg = require("./config.js")
let app = express()

app.use(bodyParser.json())
app.use(auth.initialize())

app.get("/", (req, res) => {  
    res.json({
        status: "API responds"
    });
});

app.get("/user", auth.authenticate(), (req, res) => { 
    res.json({message: "Success! You can not see this without a token"})
    // Or send user details in response
});

app.get("/userDebug", (req, res, next) => {
    console.log(req.get('Authorization'))
    next()
}, function(req, res){
    res.json("Debugging. See token in console.")
});

app.post("/token", (req, res) => {  
if (req.body.email && req.body.password) {
    let email = req.body.email;
    let password = req.body.password;
    let user = users.find((u) => {
        return u.email === email && u.password === password;
    });
    if (user) {
        let payload = {
            id: user.id,
            expiresIn: cfg.expiresIn
        };
        let token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
            Authorization: "JWT " + token
        });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
}
});

app.listen(3009, function() {  
     console.log("API is running.");
 });

module.exports = app;  