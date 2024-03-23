import express from "express"
import passport from 'passport';
import AuthInfrastructureController from "../controllers/AuthInfrastructureController";
const router = express.Router();

router.post('/registration', AuthInfrastructureController.registration) // --- > registration(user)
router.post('/login', passport.authenticate('local'), AuthInfrastructureController.login) // --- > login(user)
router.post('/logout', AuthInfrastructureController.logout) // --- > logout(user)
router.get('/activate/:link', AuthInfrastructureController.activate) // --- >
router.get('/refresh', AuthInfrastructureController.refresh) // --- > refresh(refreshToken)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
export default router