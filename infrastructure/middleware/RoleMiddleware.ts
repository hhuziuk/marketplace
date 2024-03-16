import {Role} from "../../core/domain/enums/Role";
import {Request, Response, NextFunction} from "express";

export const checkRole = (requiredRole: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user.role;
        if(userRole === requiredRole){
            next();
        } else {
            res.status(403).json({ message: "Access denied. You do not have the required role." });
        }
    }
};