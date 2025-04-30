require('dotenv').config();
module.exports = {
    // vous pouvez modifier cette valeur
    secret: process.env.AUTH_SECRET || "darth-vader",
    jwtExpiration: 600, // 10 min
    jwtRefreshExpiration: 1200, // 20 min
};
