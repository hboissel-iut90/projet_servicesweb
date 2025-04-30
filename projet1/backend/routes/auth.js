// auth.js
const authController = require("../controllers/authController")
module.exports = function (app,passport){
    function isLoggedIn(req,res,next) {
        console.log(req.isAuthenticated())
        if(req.isAuthenticated())
            return next();
        res.redirect("/errorAuth");
    }

    app.get("/home", authController.home);

    app.get("/logout", authController.logout, (req, res) => {res.status(200).json({auth: false})});

    app.post("/logged", isLoggedIn, (req, res) => {return res.status(200).json({message: "Authentification réussie", auth: true})})

    app.post("/signup", passport.authenticate('local-signup',
        {failureRedirect: '/errorInsc'}
    ), (req, res) => {return res.status(200).json({message: "Inscription réussie.", token: req.session})})

    app.get("/errorInsc", (req, res) => {return res.status(403).json({data: "L'inscription a échouée."})});

    app.post("/signin", passport.authenticate('local-signin',
        {failureRedirect: '/errorAuth'}
    ), (req, res) => { console.log(req.sessionID); return res.status(200).json({message: "Vous avez été authentifié avec succès.", token: req.sessionID})})

    app.get("/errorAuth", (req, res) => {
        return res.status(401).send({data: "Impossible de s'authentifier."})
    })
}
