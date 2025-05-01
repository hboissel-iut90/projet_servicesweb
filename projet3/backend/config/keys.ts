import * as dotenv from 'dotenv';

dotenv.config();

export default {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: "BUTINFOS5",
};
