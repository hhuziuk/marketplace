import { Request, Response, NextFunction } from "express";
import logger from "../../tools/logger";
import ShipmentInfrastructureService from "../services/ShipmentInfrastructureService";

class ShipmentInfrastructureController {
    constructor(private readonly shipmentService: ShipmentInfrastructureService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const shipmentData = req.body;
            const newShipment = await ShipmentInfrastructureService.create(shipmentData);
            res.status(201).json(newShipment);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const shipmentId = req.params.shipmentId;
            const shipmentData = req.body;
            const updatedShipment = await ShipmentInfrastructureService.update(shipmentId, shipmentData);
            res.json(updatedShipment);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const shipments = await ShipmentInfrastructureService.getAll();
            res.json(shipments);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const shipmentId = req.params.shipmentId;
            const shipment = await ShipmentInfrastructureService.getById(shipmentId);
            res.json(shipment);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async getByCarrier(req: Request, res: Response, next: NextFunction) {
        try {
            const carrier = req.params.carrier;
            const shipments = await ShipmentInfrastructureService.getByCarrier(carrier);
            res.json(shipments);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async getByTrackingNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const trackingNumber = req.params.trackingNumber;
            const shipment = await ShipmentInfrastructureService.getByTrackingNumber(trackingNumber);
            res.json(shipment);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async getByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const status = req.params.status;
            const shipments = await ShipmentInfrastructureService.getByStatus(status);
            res.json(shipments);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async getByDate(req: Request, res: Response, next: NextFunction) {
        try {
            const date = req.query.date;
            const shipments = await ShipmentInfrastructureService.getByDate(date);
            res.json(shipments);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const shipmentId = req.params.shipmentId;
            await ShipmentInfrastructureService.delete(shipmentId);
            res.sendStatus(204);
        } catch (error) {
            next(error);
            logger.error(error);
        }
    }
}

export default new ShipmentInfrastructureController(ShipmentInfrastructureService);
