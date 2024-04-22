import { NextFunction, Request, Response } from 'express';
import ShipmentInfrastructureService from "../services/ShipmentInfrastructureService";
import ApiError from "../exceptions/ApiError";

class ShipmentController {
    /**
     * @swagger
     * /shipments:
     *   post:
     *     tags:
     *       - Shipments
     *     summary: Create a new shipment
     *     description: Endpoint to create a new shipment
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: data
     *         description: Shipment data
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             shipment:
     *               type: object
     *               properties:
     *                 address_from:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                     street1:
     *                       type: string
     *                     city:
     *                       type: string
     *                     state:
     *                       type: string
     *                     zip:
     *                       type: string
     *                     country:
     *                       type: string
     *                     phone:
     *                       type: string
     *                 address_to:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                     street1:
     *                       type: string
     *                     city:
     *                       type: string
     *                     state:
     *                       type: string
     *                     zip:
     *                       type: string
     *                     country:
     *                       type: string
     *                     phone:
     *                       type: string
     *                 parcels:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       length:
     *                         type: number
     *                       width:
     *                         type: number
     *                       height:
     *                         type: number
     *                       weight:
     *                         type: number
     *                       mass_unit:
     *                         type: string
     *                       distance_unit:
     *                         type: string
     *             orderId:
     *               type: string
     *     responses:
     *       200:
     *         description: Shipment created successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async createShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            if (!data) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const shipment = await ShipmentInfrastructureService.createShipment(data);
            res.json(shipment);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     * /shipments/{trackingCode}:
     *   get:
     *     tags:
     *       - Shipments
     *     summary: Track shipment
     *     description: Endpoint to track a shipment by tracking code
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: trackingCode
     *         description: Tracking code of the shipment
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns the tracking information
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async trackShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { trackingCode } = req.params;
            if (!trackingCode) {
                ApiError.BadRequest(`trackingCode is missing`);
            }
            const trackingInfo = await ShipmentInfrastructureService.trackShipment(trackingCode);
            res.json(trackingInfo);
        } catch (error) {
            next(error);
        }
    }
}

export default new ShipmentController();
