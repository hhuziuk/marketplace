import {Role} from "../../core/domain/enums/Role";
import {Request, Response, NextFunction} from "express";
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";


export const verify = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        try {
            const user = await UserPostgresRepository.getBy({ email: email });
            if (!user.verified) {
                return res.status(404).json({ message: "Seller is not verified." });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
};