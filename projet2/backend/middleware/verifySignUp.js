const db = require("../models");
const User = db.user;
checkDuplicateUsername = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            emailId: req.body.emailId
        }
    }).then(user => {
        if (user) {
            return res.status(400).json({
                data: "Échoué! Nom d'utilisateur est déjà utilisé!"
            });
        }
        next();
    }).catch(err => {
        next()
    });
};
const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};
module.exports = verifySignUp;
