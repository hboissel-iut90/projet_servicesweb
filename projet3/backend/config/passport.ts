import passport from 'passport';
import {Strategy as GoogleStrategy, VerifyCallback} from 'passport-google-oauth20';
import {Profile, Strategy as GithubStrategy} from 'passport-github2'
import keys from './keys';
import mongoose from 'mongoose';

const User = mongoose.model('User');

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(User.createStrategy());

passport.use(
    new GoogleStrategy(
        {
            callbackURL: 'http://localhost:5000/auth/google/callback',
            clientID: keys.googleClientID as string,
            clientSecret: keys.googleClientSecret as string,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({googleId: profile.id});
                if (existingUser) {
                    return done(null, existingUser);
                }
                const user = await new User({googleId: profile.id, displayName: profile.displayName}).save();
                done(null, user);
            } catch (err) {
                done(err, undefined); // error-first callback
            }
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: keys.githubClientID as string,
            clientSecret: keys.githubClientSecret as string,
            callbackURL: 'http://localhost:5000/auth/github/callback'
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                let user = await User.findOne({githubId: profile.id});
                if (!user) {
                    user = await new User({githubId: profile.id, displayName: profile.displayName}).save();
                }
                done(null, user);
            } catch (err) {
                done(err, undefined);
            }
        }
    )
);
