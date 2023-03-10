import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/add', ) // ---> createOrder()
router.post('/confirm', checkRole(Role.Customer) ) // ---> confirmOrder()
router.get('/orders', ) // ---> getAll() for implementation!
router.get('/:orderId', ) // ---> getById() for implementation!
router.put('/setStatus/:orderId', checkRole(Role.Admin)) // ---> setStatus()
router.delete('/cancelOrder/:orderId', ) // ---> cancelOrder()

export default router