import AuthInfrastructureService from "../services/AuthInfrastructureService";
import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";

class AuthInfrastructureController {
    constructor(readonly authService: any = AuthInfrastructureService) {
    }

    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: Operations related to user management
     */

    /**
     * @swagger
     * /api/users/registration:
     *   post:
     *     summary: Register a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               role:
     *                 type: string
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Bad request
     *       409:
     *         description: User with the same ${email} already exists
     *       500:
     *         description: Internal server error
     */



    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email,
                name,
                surname,
                username,
                password,
                phoneNumber,
                country,
                city,
                postalCode,
                address,
                role
            } = req.body;
            const userData = await AuthInfrastructureService.registration(
                email,
                name,
                surname,
                username,
                password,
                phoneNumber,
                country,
                city,
                postalCode,
                address,
                role
            );

            if (AuthInfrastructureService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            } else {
                req.session.user = {...userData};
            }
            return res.status(201).json(userData);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userData = await AuthInfrastructureService.login(email, password)
            if (AuthInfrastructureService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            } else {
                req.session.user = {...userData};
            }
            return res.json(userData)
        } catch (e) {
            logger.error(e)
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body;
            const userData = AuthInfrastructureService.logout(email)
            if (AuthInfrastructureService.cookiesEnabled) {
                res.clearCookie('userData')
            } else {
                await req.session.destroy((err) => {
                    if (err) {
                        res.clearCookie('sessioncookie')
                        logger.error(err);
                    }
                })
            }
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await AuthInfrastructureService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '')
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userData = await AuthInfrastructureService.refresh(refreshToken)
            if (AuthInfrastructureService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            }
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthInfrastructureController();