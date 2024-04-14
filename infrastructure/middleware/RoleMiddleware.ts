import {Role} from "../../core/domain/enums/Role";
import {Request, Response, NextFunction} from "express";
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";

export const checkRole = (requiredRole: Role) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        try {
            const userRole = await UserPostgresRepository.getBy({ email: email });
            if (userRole && userRole.role === requiredRole) {
                next();
            } else {
                res.status(403).json({ message: "Access denied. You do not have the required role." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
};