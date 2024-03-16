import UserInfrastructureController from "../controllers/UserInfrastructureController"
import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

// Routes for Admin
router.post('/admin/users', checkRole(Role.Admin), UserInfrastructureController.createAdmin);
router.get('/admin/:userId', checkRole(Role.Admin), UserInfrastructureController.getByIdAdmin);
router.put('/admin/update/:userId', checkRole(Role.Admin), UserInfrastructureController.updateAdmin);
router.delete('/admin/delete/:userId', checkRole(Role.Admin), UserInfrastructureController.deleteAdmin);

// Routes for Seller
router.post('/seller/users', checkRole(Role.Seller), UserInfrastructureController.createSeller);
router.get('/seller/:userId', checkRole(Role.Seller), UserInfrastructureController.getByIdSeller);
router.put('/seller/update/:userId', checkRole(Role.Seller), UserInfrastructureController.updateSeller);
router.delete('/seller/delete/:userId', checkRole(Role.Seller), UserInfrastructureController.deleteSeller);

// Routes for Customer
router.post('/customer/users', checkRole(Role.Customer), UserInfrastructureController.createCustomer);
router.get('/customer/:userId', checkRole(Role.Customer), UserInfrastructureController.getByIdCustomer);
router.put('/customer/update/:userId', checkRole(Role.Customer), UserInfrastructureController.updateCustomer);
router.delete('/customer/delete/:userId', checkRole(Role.Customer), UserInfrastructureController.deleteCustomer);

export default router


