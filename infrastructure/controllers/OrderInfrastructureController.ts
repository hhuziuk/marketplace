import logger from "../../tools/logger";
import {NextFunction, Request, Response} from "express";
import OrderInfrastructureService from "../services/OrderInfrastructureService";
import OrderPostgresRepository from "../database/PostgresRepository/OrderPostgresRepository";
import ApiError from "../exceptions/ApiError";
class OrderInfrastructureController {
    constructor(readonly orderService: any = OrderInfrastructureService) {}
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderData = req.body;
            const order = await this.orderService.createOrder(orderData);
            return res.json(order);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }

    async confirmOrder(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const orders = await OrderInfrastructureService.getAll();
            return res.json(orders);
        } catch(e) {
            next(e);
            logger.error(e)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const {orderId} = req.params;
            if (!orderId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const order = await OrderInfrastructureService.getById(orderId);
            return res.json(order)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async cancelOrder(req: Request, res: Response, next: NextFunction){
        try{
            const {orderId} = req.body;
            if (!orderId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const book = await OrderInfrastructureService.cancelOrder(orderId)
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async setStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId, status } = req.body;
            if (!orderId || !status) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            await this.orderService.setStatus(orderId, status);
            return res.json({ message: "Status updated successfully" });
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
}

export default new OrderInfrastructureController(OrderPostgresRepository);