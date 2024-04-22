import AuthInfrastructureService from "../services/AuthInfrastructureService";
import {Response, Request, NextFunction} from "express";

class AuthInfrastructureController {
    constructor(readonly authService: any = AuthInfrastructureService) {
    }

    /**
     * @swagger
     * /users/registration:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Register a new user
     *     description: Endpoint to register a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: User object that needs to be registered
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *             name:
     *               type: string
     *             surname:
     *               type: string
     *             username:
     *               type: string
     *             password:
     *               type: string
     *             phoneNumber:
     *               type: string
     *             country:
     *               type: string
     *             city:
     *               type: string
     *             postalCode:
     *               type: string
     *             address:
     *               type: string
     *             role:
     *               type: string
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Bad request
     *       409:
     *         description: User with the same email already exists
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
        }
    }

    /**
     * @swagger
     * /users/login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Log in a user
     *     description: Endpoint to log in a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: User credentials for login
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *             password:
     *               type: string
     *     responses:
     *       200:
     *         description: User logged in successfully
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized - invalid credentials
     *       500:
     *         description: Internal server error
     */
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
            next(e);
        }
    }

    /**
     * @swagger
     * /users/logout:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Log out a user
     *     description: Endpoint to log out a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: User email for logout
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *     responses:
     *       200:
     *         description: User logged out successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
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
                    }
                })
            }
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /users/activate/{link}:
     *   get:
     *     tags:
     *       - Auth
     *     summary: Activate user account
     *     description: Endpoint to activate user account using activation link
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: link
     *         description: Activation link
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: User account activated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await AuthInfrastructureService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '')
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /users/refresh:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Refresh user token
     *     description: Endpoint to refresh user token
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: cookie
     *         name: refreshToken
     *         description: Refresh token
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Token refreshed successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
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
