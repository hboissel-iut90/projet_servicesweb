import { Router } from 'express';
import Message from '../models/Message';
import requireLogin from '../middlewares/requireLogin';
import redisClient from '../config/redis';
import { Server } from 'socket.io';

const router = Router();

let io: Server;

// Récupérer les messages
router.get('/api/messages', requireLogin, async (req, res) => {
    const cacheKey = 'chat:messages';
    const cached = await redisClient.lRange(cacheKey, 0, -1);

    // @ts-ignore
    if (cached.length > 0) {
        // @ts-ignore
        const messages = cached.map(msg => JSON.parse(msg));
        res.json(messages);
        return;
    }

    const messages = await Message.find()
        .populate('sender')
        .sort({ timestamp: 1 })
        .limit(100);

    messages.forEach(message => {
        redisClient.rPush(cacheKey, JSON.stringify(message));
    });

    res.json(messages);
});

// Envoyer un nouveau message
router.post('/api/messages', requireLogin, async (req, res) => {
    const { content } = req.body;

    if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    const message = await Message.create({
        content,
        //@ts-ignore
        sender: req.user._id
    });

    const populated = await message.populate('sender');

    // Stocker le nouveau message dans Redis
    const cacheKey = 'chat:messages';
    await redisClient.rPush(cacheKey, JSON.stringify(populated));

    // Limiter la taille de la liste à 100 messages
    await redisClient.lTrim(cacheKey, 0, 99);

    // Émettre l'événement pour notifier tous les clients connectés
    if (io) {
        io.emit('new-message', populated);
    }

    res.status(201).json(populated);
});

// Cette fonction permet de lier le serveur à l'instance de Socket.IO
export const setSocketIO = (socketIo: Server) => {
    io = socketIo;
};

export default router;
