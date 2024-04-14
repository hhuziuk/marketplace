import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/deliveryInfo/add', checkRole(Role.Admin), DeliveryInfoInfrastructureController.create);
router.put('/deliveryInfo/:deliveryInfoId', checkRole(Role.Admin), DeliveryInfoInfrastructureController.update);
router.get('/deliveryInfo', checkRole(Role.Admin), DeliveryInfoInfrastructureController.getAll);
router.get('/deliveryInfo/:deliveryInfoId', checkRole(Role.Admin), DeliveryInfoInfrastructureController.getById);
router.delete('/deliveryInfo/:deliveryInfoId', checkRole(Role.Admin), DeliveryInfoInfrastructureController.delete);

export default router