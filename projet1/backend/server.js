const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoute = require('./routes/authRouter.js');

// Encodage
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.SECRET);


// Handlebars
const exphbs = require("express-handlebars");
app.set("views","./views");
app.set("view engine", ".hbs");
app.engine("hbs",exphbs.engine({extname: ".hbs"
    , defaultLayout:"",layoutsDir:""
}));


// Models
const models = require("./models");
models.sequelize.sync().then(()=> {
    console.log("BDD fonctionne bien");
}).catch((err)=> {
    console.log(err);
})

// Passport
app.use(session({secret:process.env.SECRET,resave:true,
    saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport.js")(passport,models.user);

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

require('./routes/auth.js')(app, passport);


app.use('/auth', authRoute)

app.listen(3000,()=>{
    console.log("Serveur ecoute sur port 3000")});