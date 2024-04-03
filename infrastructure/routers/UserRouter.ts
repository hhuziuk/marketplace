import UserInfrastructureController from "../controllers/UserInfrastructureController"
import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import {authenticateUser} from "../middleware/AuthenticateMiddleware";
const router = express.Router();

router.post('/users', checkRole(Role.Admin), UserInfrastructureController.getAll);

// Routes for Admin
router.post('/admin/users', authenticateUser, checkRole(Role.Admin), UserInfrastructureController.createAdmin);
router.get('/admin/:userId', authenticateUser, checkRole(Role.Admin), UserInfrastructureController.getByIdAdmin);
router.put('/admin/update/:userId', authenticateUser, checkRole(Role.Admin), UserInfrastructureController.updateAdmin);
router.delete('/admin/delete/:userId', authenticateUser, checkRole(Role.Admin), UserInfrastructureController.deleteAdmin);

// Routes for Seller
router.post('/seller/users', authenticateUser, checkRole(Role.Seller), UserInfrastructureController.createSeller);
router.get('/seller/:userId', authenticateUser, checkRole(Role.Seller), UserInfrastructureController.getByIdSeller);
router.put('/seller/update/:userId', authenticateUser, checkRole(Role.Seller), UserInfrastructureController.updateSeller);
router.delete('/seller/delete/:userId', authenticateUser, checkRole(Role.Seller), checkRole(Role.Admin), UserInfrastructureController.deleteSeller);

// Routes for Customer
router.post('/customer/users', authenticateUser, checkRole(Role.Customer), UserInfrastructureController.createCustomer);
router.get('/customer/:userId', authenticateUser, checkRole(Role.Customer), UserInfrastructureController.getByIdCustomer);
router.put('/customer/update/:userId', authenticateUser, checkRole(Role.Customer), UserInfrastructureController.updateCustomer);
router.delete('/customer/delete/:userId', authenticateUser, checkRole(Role.Customer), checkRole(Role.Admin), UserInfrastructureController.deleteCustomer);

export default router


