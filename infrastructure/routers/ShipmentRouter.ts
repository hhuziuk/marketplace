import express from 'express';
import ShipmentController from '../controllers/ShipmentInfrastructureController';

const router = express.Router();

router.post('/shipments', ShipmentController.createShipment);
router.get('/shipments/:trackingCode', ShipmentController.trackShipment);

export default router;