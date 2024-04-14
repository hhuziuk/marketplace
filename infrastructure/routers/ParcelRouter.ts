import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";

const router = express.Router();

router.post('/parcel/add', checkRole(Role.Customer), ParcelInfrastructureController.create);
router.put('/parcel/:parcelId', checkRole(Role.Customer), ParcelInfrastructureController.update);
router.get('/parcel', checkRole(Role.Admin), ParcelInfrastructureController.getAll);
router.get('/parcel/:parcelId', checkRole(Role.Admin, Role.Customer, Role.Seller), ParcelInfrastructureController.getById);
router.delete('/parcel/:parcelId', checkRole(Role.Admin, Role.Seller), ParcelInfrastructureController.delete);

export default router