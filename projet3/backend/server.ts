import express from 'express';
import keys from './config/keys';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from "passport";
import Message from './models/Message';

import http from 'http';
import {Server} from 'socket.io';


import './models/User';
import './config/passport';

mongoose.connect(keys.mongoURI as string);

const app = express();
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());


import { RedisStore } from 'connect-redis'
import { createClient } from 'redis';

const redisClient = createClient({url: 'redis://127.0.0.1:6379'});
redisClient.connect().catch(console.error);

const store = new RedisStore({client: redisClient});

app.use(session({
    store: store,
    secret: keys.cookieKey as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
        secure: false, // si tu es en HTTPS en prod -> true
        sameSite: 'lax', // ou 'none' si tu veux cross-site cookies
    }
}));





app.use(passport.initialize());
app.use(passport.session());

import authRoutes from './routes/authRoutes';

authRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('load-messages', async () => {
        const messages = await Message.find().populate('sender').sort({ timestamp: 1 }).limit(100);
        socket.emit('message-history', messages);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

import messageRoutes, {setSocketIO } from './routes/messageRoutes';
setSocketIO(io);
app.use(messageRoutes);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
