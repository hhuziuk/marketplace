import UserInfrastructureController from "../controllers/UserInfrastructureController"
import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import authMiddleware from "../middleware/AuthenticateMiddleware";
const router = express.Router();

router.post('/users', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.getAll);

// Routes for Admin
router.get('/admin/:userId', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.getById);
router.put('/admin/verifySeller/:userId', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.verifySeller);
router.put('/admin/update/:userId', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.update);
router.delete('/admin/delete/:userId', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.delete);

// Routes for Seller
router.get('/seller/:userId', authMiddleware, UserInfrastructureController.getById);
router.put('/seller/update/:userId', authMiddleware, checkRole(Role.Seller), checkRole(Role.Admin), UserInfrastructureController.update);
router.delete('/seller/delete/:userId', authMiddleware, checkRole(Role.Admin), checkRole(Role.Seller), checkRole(Role.Admin), UserInfrastructureController.delete);

// Routes for Customer
router.get('/customer/:userId', authMiddleware, UserInfrastructureController.getById);
router.put('/customer/update/:userId', authMiddleware, checkRole(Role.Customer), checkRole(Role.Admin), UserInfrastructureController.update);
router.delete('/customer/delete/:userId', authMiddleware, checkRole(Role.Customer), checkRole(Role.Admin), UserInfrastructureController.delete);

export default router


