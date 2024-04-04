import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import OrderInfrastructureController from "../controllers/OrderInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Customer), checkRole(Role.Admin), checkRole(Role.Seller), OrderInfrastructureController.createOrder) // ---> createOrder()
router.post('/confirm', checkRole(Role.Customer), OrderInfrastructureController.confirmOrder) // ---> confirmOrder()
router.get('/orders', checkRole(Role.Admin), checkRole(Role.Seller), OrderInfrastructureController.getAll) // ---> getAll() for implementation!
router.get('/:orderId', checkRole(Role.Customer), checkRole(Role.Admin), checkRole(Role.Seller), OrderInfrastructureController.getById) // ---> getById() for implementation!
router.put('/setStatus/:orderId', checkRole(Role.Admin), OrderInfrastructureController.setStatus) // ---> setStatus()
router.delete('/cancelOrder/:orderId', checkRole(Role.Customer), checkRole(Role.Admin), checkRole(Role.Seller), OrderInfrastructureController.cancelOrder) // ---> cancelOrder()

export default router