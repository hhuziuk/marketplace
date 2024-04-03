import express from "express"
import passport from 'passport';
import AuthInfrastructureController from "../controllers/AuthInfrastructureController";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";
import logger from "../../tools/logger";
import {compare} from "bcrypt";
const router = express.Router();

passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const userFound = await UserPostgresRepository.getBy({email: email});
        if(userFound && compare(password, userFound.password)){
            done(null, userFound);
        } else {
            done(null, false);
        }
    } catch (error) {
        logger.error(error)
        done(error);
    }
}));

router.post('/registration', AuthInfrastructureController.registration) // --- > registration(user)
router.post('/login', passport.authenticate('local'), AuthInfrastructureController.login) // --- > login(user)
router.post('/logout', AuthInfrastructureController.logout) // --- > logout(user)
router.get('/activate/:link', AuthInfrastructureController.activate) // --- >
router.get('/refresh', AuthInfrastructureController.refresh) // --- > refresh(refreshToken)


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
            }

            try {
                let user = await UserPostgresRepository.getBy({ googleId: profile.id })
                if (user) {
                    done(null, user)
                } else {
                    done(null, await UserPostgresRepository.create(newUser))
                }
            } catch (err) {
                console.error(err)
            }
        }
    )
)
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/login/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
export default router;