import { NextFunction, Request, Response } from 'express';
import logger from '../../tools/logger';
import ShipmentInfrastructureService from "../services/ShipmentInfrastructureService";

class ShipmentController {
    async createShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const shipment = await ShipmentInfrastructureService.createShipment(data);
            res.json(shipment);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async trackShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {trackingCode} = req.params;
            const trackingInfo = await ShipmentInfrastructureService.trackShipment(trackingCode);
            res.json(trackingInfo);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }
}

export default new ShipmentController();
