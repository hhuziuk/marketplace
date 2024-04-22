import {NextFunction, Request, Response} from "express";
import OrderInfrastructureService from "../services/OrderInfrastructureService";
import ApiError from "../exceptions/ApiError";

class OrderInfrastructureController {
    constructor(readonly orderService: any = OrderInfrastructureService) {
    }

    /**
     * @swagger
     * /orders/create:
     *   post:
     *     tags:
     *       - Orders
     *     summary: Create a new order
     *     description: Endpoint to create a new order
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: orderData
     *         description: Order data to create a new order
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             createdAt:
     *               type: string
     *             status:
     *               type: string
     *             user:
     *               type: string
     *             orderItems:
     *               type: array
     *               items:
     *                 type: object
     *             amount:
     *               type: number
     *             delivery:
     *               type: string
     *             payment:
     *               type: string
     *             shipment:
     *               type: string
     *     responses:
     *       200:
     *         description: Order created successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderData = req.body;
            const order = await OrderInfrastructureService.createOrder(orderData);
            return res.json(order);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /orders/confirm/{orderId}:
     *   put:
     *     tags:
     *       - Orders
     *     summary: Confirm an order
     *     description: Endpoint to confirm an order by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: orderId
     *         description: ID of the order to confirm
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Order confirmed successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async confirmOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const {orderId} = req.params;
            if (!orderId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const order = await OrderInfrastructureService.confirmOrder(orderId);
            return res.json(order);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /orders:
     *   get:
     *     tags:
     *       - Orders
     *     summary: Get all orders
     *     description: Endpoint to retrieve all orders
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all orders
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await OrderInfrastructureService.getAll();
            return res.json(orders);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /orders/{orderId}:
     *   get:
     *     tags:
     *       - Orders
     *     summary: Get order by ID
     *     description: Endpoint to retrieve an order by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: orderId
     *         description: ID of the order to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns the order with the specified ID
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const {orderId} = req.params;
            if (!orderId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const order = await OrderInfrastructureService.getById(orderId);
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /orders/cancelOrder/{orderId}:
     *   put:
     *     tags:
     *       - Orders
     *     summary: Cancel an order
     *     description: Endpoint to cancel an order by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: orderId
     *         description: ID of the order to cancel
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Order cancelled successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async cancelOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const {orderId} = req.params;
            if (!orderId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            await OrderInfrastructureService.cancelOrder(orderId)
            return res.json({message: "Order cancelled successfully"});
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /orders/setStatus/{orderId}:
     *   put:
     *     tags:
     *       - Orders
     *     summary: Set status of an order
     *     description: Endpoint to set status of an order by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: orderId
     *         description: ID of the order to update status
     *         required: true
     *         type: string
     *       - in: body
     *         name: status
     *         description: New status for the order
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             status:
     *               type: string
     *     responses:
     *       200:
     *         description: Order status updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async setStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const {orderId} = req.params;
            const {status} = req.body;
            if (!orderId || !status) {
                ApiError.BadRequest(`Required data is missing`);
            }
            await OrderInfrastructureService.setStatus(orderId, status);
            return res.json({message: "Status updated successfully"});
        } catch (e) {
            next(e);
        }
    }
}

export default new OrderInfrastructureController(OrderInfrastructureService);
