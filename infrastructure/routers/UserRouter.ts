import UserInfrastructureController from "../controllers/UserInfrastructureController"
import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import authMiddleware from "../middleware/AuthenticateMiddleware";
const router = express.Router();

// Routes for Admin
router.get('/users', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.getAll);
router.post('/users', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.create);
router.get('/users/:id', authMiddleware, UserInfrastructureController.getById);
router.put('/users/verifySeller/:id', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.verifySeller);
router.put('/users/update/:id', authMiddleware, UserInfrastructureController.update);
router.delete('/users/delete/:id', authMiddleware, UserInfrastructureController.delete);

// Routes for Seller
router.get('/seller/:id', authMiddleware, UserInfrastructureController.getById);
router.put('/seller/update/:id', authMiddleware, checkRole(Role.Seller, Role.Admin), UserInfrastructureController.update);
router.delete('/seller/delete/:id', authMiddleware, checkRole(Role.Admin, Role.Seller), checkRole(Role.Admin), UserInfrastructureController.delete);

// Routes for Customer
router.get('/customer/:id', authMiddleware, UserInfrastructureController.getById);
router.put('/customer/update/:id', authMiddleware, checkRole(Role.Customer, Role.Admin), UserInfrastructureController.update);
router.delete('/customer/delete/:id', authMiddleware, checkRole(Role.Customer, Role.Admin), UserInfrastructureController.delete);

export default router


