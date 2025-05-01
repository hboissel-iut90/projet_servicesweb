import { Request, Response, NextFunction } from 'express';
import '../models/User'; // Importer ton modèle User

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // @ts-ignore
    if (!req.user) {
        res.status(401).send({ error: 'Vous devez vous connecter!' });
        return;
    }
    next();
};

export default authMiddleware;
