import {Role} from "../../core/domain/enums/Role";
import {Request, Response, NextFunction} from "express";
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";

export const checkRole = (...requiredRoles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        try {
            const user = await UserPostgresRepository.getBy({ email: email });
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            const userRole = user.role;
            if (!requiredRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access denied. You do not have the required role." });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
};