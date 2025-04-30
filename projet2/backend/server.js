const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');

// analyser les requêtes de type de contenu - application/json
app.use(bodyParser.json());
// analyser les requêtes de type de contenu - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.json({message: "Bienvenue dans l'application : Auth JWT"});
});

const db = require("./models");
db.sequelize.sync().then(() => {
    console.log('Database synchronized successfully');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use("/auth", authRoute)
app.use("/access", userRoute)

// définir le port, écouter les requêtes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}.`);
});
