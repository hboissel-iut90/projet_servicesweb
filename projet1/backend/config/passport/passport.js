const bCrypt = require("bcrypt");
module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require("passport-local")
        .Strategy;
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then((user) => {
            if (user) {
                done(null, user.get())
            } else {
                done(user.errors, null)
            }
        })
    })
    passport.use("local-signup", new LocalStrategy({
        usernameField: 'login',
        passwordField: 'passwd',
        passReqToCallback: true
    }, function (req, login, passwd, done) {
        let generateHash = function (password) {
            return bCrypt.hashSync(password,
                bCrypt.genSaltSync(8), null
            );
        }
        User.findOne({where: {emailId: login}}).then((user) => {
            if (user) {
                console.log("Email déjà pris.")
                return done(null, false, {message: "Email déjà pris."});
            } else {
                let userPassword = generateHash(passwd);
                let data = {
                    emailId: login,
                    password: userPassword,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname
                };
                User.create(data).then((newUser) => {
                    if (!newUser) {
                        console.log("Aucun utilisateur créé.")
                        return done(null, false, {message: "Aucun utilisateur créé."});
                    }
                    if (newUser) {
                        console.log("Nouvel utilisateur créé.")
                        return done(null, newUser)
                    }
                })
            }
        })
    }));
    passport.use("local-signin", new LocalStrategy({
        usernameField: 'login',
        passwordField: 'passwd',
        passReqToCallback: true
    }, function (req,login,passwd,done) {
        let isValidPassword = function (userpass, password) {
            return bCrypt.compareSync(password, userpass);
        };
        User.findOne({where: {emailId: login}}).then((user) => {
            if (!user) {
                return done(null, false, {message: "Cette email n'existe pas."})
            }
            if (!isValidPassword(user.password, passwd)) {
                return done(null, false, {message: "Mot de passe incorrect."})
            }
            console.log(user.get())
            return done(null, user.get());
        }).catch(err => {
            return done(null, false, {message: "Une erreur s'est produite."})
        })
    }));
}