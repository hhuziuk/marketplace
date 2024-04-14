import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import ShipmentInfrastructureController from "../controllers/ShipmentInfrastructureController";
const router = express.Router();

router.post('/shipment/add', checkRole(Role.Customer), ShipmentInfrastructureController.create);
router.put('/shipment/:shipmentId', checkRole(Role.Customer), ShipmentInfrastructureController.update);
router.get('/shipment', checkRole(Role.Admin), ShipmentInfrastructureController.getAll);
router.get('/shipment/:shipmentId', checkRole(Role.Admin, Role.Customer, Role.Seller), ShipmentInfrastructureController.getById);
router.get('/shipment/:carrier', checkRole(Role.Admin, Role.Customer, Role.Seller), ShipmentInfrastructureController.getByCarrier);
router.get('/shipment/:trackingNumber', checkRole(Role.Admin, Role.Customer, Role.Seller), ShipmentInfrastructureController.getByTrackingNumber);
router.get('/shipment/:status', checkRole(Role.Admin, Role.Customer, Role.Seller), ShipmentInfrastructureController.getByStatus);
router.get('/shipment/:date', checkRole(Role.Admin, Role.Customer, Role.Seller), ShipmentInfrastructureController.getByDateRange);
router.delete('/shipment/:shipmentId', checkRole(Role.Admin), ShipmentInfrastructureController.delete);

export default router