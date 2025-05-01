import passport from 'passport';
import {Application, Request, Response} from 'express';
import User from '../models/User';

export default (app: Application): void => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/'}),
        (req, res) => {
            res.redirect('http://localhost:5173/chat');
        }
    );

    // GITHUB
    app.get('/auth/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('http://localhost:5173/chat');
        });

    // --- LOCAL AUTH ---

    // Inscription
    app.post('/auth/local/register', async (req: Request, res: Response) => {
        const { username, password, displayName } = req.body;

        try {
            const user = new User({ username, displayName, email: username }); // username = email
            await User.register(user, password); // méthode de passport-local-mongoose

            // Authentifier immédiatement après inscription
            passport.authenticate('local')(req, res, () => {
                res.status(200).json({ success: true, user: req.user });
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err });
        }
    });

    // Connexion
    app.post('/auth/local', (req: Request, res: Response, next) => {
        passport.authenticate('local', (err: any, user: Express.User, info: { message: any; }) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ success: false, message: info?.message });

            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.status(200).json({ success: true, user });
            });
        })(req, res, next);
    });

    app.get('/auth/logout', (req, res) => {
        req.logout(() => {
            res.clearCookie('connect.sid');
            res.json({ success: true });
        });
    });


    app.get('/api/current_user', (req, res) => {
        console.log('User:', req.user);
        if (req.user) {
            res.setHeader('Content-Type', 'application/json');
            res.json(req.user);
        } else {
            res.status(401).json({ error: 'Not authenticated' });
        }
    });

};
