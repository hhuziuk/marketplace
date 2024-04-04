import { OrderDomainService } from "../../core/services/OrderDomainService";
import { Status } from "../../core/domain/enums/Status";
import { Order, OrderItem } from "../../core/domain/Order";
import ApiError from "../exceptions/ApiError";
import OrderPostgresRepository from "../database/PostgresRepository/OrderPostgresRepository";
class OrderInfrastructureService {
    constructor(readonly orderRepository: any = new OrderDomainService(orderRepository)) {}
    async createOrder(orderData: Partial<Order>): Promise<Order> {
        const { createdAt, status, userId, orderItems, totalPrice, paymentId, deliveryType } = orderData;

        if (!createdAt || !status || !userId || !orderItems || !totalPrice || !paymentId || !deliveryType) {
            throw ApiError.BadRequest(`Required data is missing`);
        }
        const order = await this.orderRepository.create({
            createdAt,
            status,
            userId,
            orderItems,
            totalPrice,
            paymentId,
            deliveryType,
        });

        await this.orderRepository.save(order);
        return order;
    }
    async confirmOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw ApiError.BadRequest(`Order with id ${orderId} not found`);
        }
        order.status = Status.confirmed;
        await this.orderRepository.save(order);
        return order;
    }
    async getAll(): Promise<Order[]> {
        return await this.orderRepository.getAll();
    }
    async getById(orderId: string): Promise<Order | null> {
        return await this.orderRepository.getById(orderId);
    }
    async cancelOrder(orderId: string): Promise<void> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw ApiError.BadRequest(`Order with id ${orderId} not found`);
        }
        order.status = Status.cancelled;
        await this.orderRepository.save(order);
    }
    async setStatus(orderId: string, status: Status): Promise<void> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw ApiError.BadRequest(`Order with id ${orderId} not found`);
        }
        order.status = status;
        await this.orderRepository.save(order);
    }
}
export default new OrderInfrastructureService(OrderPostgresRepository);
