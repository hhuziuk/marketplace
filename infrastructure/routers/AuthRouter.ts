import express from "express"
import passport from 'passport';
import AuthInfrastructureController from "../controllers/AuthInfrastructureController";
import { Strategy as LocalStrategy } from 'passport-local';
import AuthInfrastructureService from "../services/AuthInfrastructureService";
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

router.get('/auth/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/login/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
export default router