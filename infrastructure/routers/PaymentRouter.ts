import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import PaymentInfrastructureController from "../controllers/PaymentInfrastructureController";

const router = express.Router();

router.post('/set', checkRole(Role.Customer), PaymentInfrastructureController.setPaymentMethod) // ---> setPaymetMethod()
router.get('/payments', checkRole(Role.Customer), PaymentInfrastructureController.getAll) // ---> getAll() for implementation!
router.put('/update', checkRole(Role.Customer), PaymentInfrastructureController.updatePaymentMethod) // ---> setStatus()  for implementation!

export default router