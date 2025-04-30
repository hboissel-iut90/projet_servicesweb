const express = require("express")
const router = express.Router();

router.get("/logout", (req, res) => { res.redirect("/logout")});

router.get("/logged", (req, res) => { res.redirect("/logged")});

router.post("/signup", (req, res) => { res.redirect("/signup")});

router.post("/signin", (req, res) => { res.redirect("/signup")});

module.exports = router;