import UserInfrastructureController from "../controllers/UserInfrastructureController"
import express from "express"
const router = express.Router();

// Routes for Admin
router.post('/admin/users', UserInfrastructureController.createAdmin);
router.get('/admin/:userId', UserInfrastructureController.getByIdAdmin);
router.put('/admin/update/:userId', UserInfrastructureController.updateAdmin);
router.delete('/admin/delete/:userId', UserInfrastructureController.deleteAdmin);

// Routes for Seller
router.post('/seller/users', UserInfrastructureController.createSeller);
router.get('/seller/:userId', UserInfrastructureController.getByIdSeller);
router.put('/seller/update/:userId', UserInfrastructureController.updateSeller);
router.delete('/seller/delete/:userId', UserInfrastructureController.deleteSeller);

// Routes for Customer
router.post('/customer/users', UserInfrastructureController.createCustomer);
router.get('/customer/:userId', UserInfrastructureController.getByIdCustomer);
router.put('/customer/update/:userId', UserInfrastructureController.updateCustomer);
router.delete('/customer/delete/:userId', UserInfrastructureController.deleteCustomer);

export default router


