import { NextFunction, Request, Response } from 'express';
import logger from '../../tools/logger';
import ShipmentInfrastructureService from "../services/ShipmentInfrastructureService";

class ShipmentController {
    async createShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const shipment = await ShipmentInfrastructureService.createShipment(data);
            res.status(201).json(shipment);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }

    async trackShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const trackingCode = req.params.trackingCode;
            const trackingInfo = await ShipmentInfrastructureService.trackShipment(trackingCode);
            res.status(200).json(trackingInfo);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
}

export default new ShipmentController();