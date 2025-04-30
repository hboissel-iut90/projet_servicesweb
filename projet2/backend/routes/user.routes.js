const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");
const express = require("express")
const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/user", [authJwt.verifyToken], controller.userAccess);

module.exports = router;