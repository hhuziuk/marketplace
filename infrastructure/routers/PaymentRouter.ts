import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import PaymentInfrastructureController from "../controllers/PaymentInfrastructureController";

const router = express.Router();

router.post('/set', PaymentInfrastructureController.setPaymentMethod)
router.get('/payments', checkRole(Role.Customer, Role.Admin), PaymentInfrastructureController.getAll)
router.put('/update/:paymentId', checkRole(Role.Customer), PaymentInfrastructureController.updatePaymentMethod)

export default router