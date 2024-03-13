import express from "express"
import passport from "passport"
const router = express.Router();

router.get('/login/google', passport.authenticate('google'))
router.get('/auth/google', passport.authenticate('google'));

export default router


