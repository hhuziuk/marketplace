import { OrderDomainService } from "../../core/services/OrderDomainService";
import { DeliveryStatus } from "../../core/domain/enums/DeliveryStatus";
import ApiError from "../exceptions/ApiError";
import OrderPostgresRepository from "../database/PostgresRepository/OrderPostgresRepository";
import {Order} from "../database/PostgresEntities/OrderEntity";

class OrderInfrastructureService {

    constructor(readonly orderRepository: any = new OrderDomainService(orderRepository)) {}

    async createOrder(orderData: Partial<Order>): Promise<Order> {
        const { createdAt, status, user, orderItems, amount, delivery, payment } = orderData;

        if (!createdAt || !status || !user || !orderItems || !amount || !delivery) {
            throw ApiError.BadRequest(`Required data is missing`);
        }

        const order = await this.orderRepository.create({
            createdAt,
            status,
            user,
            orderItems,
            amount,
            delivery,
            payment: null
        });

        await this.orderRepository.save(order);
        return order;
    }
    async confirmOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw ApiError.BadRequest(`Order with id ${orderId} not found`);
        }
        order.status = DeliveryStatus.IN_TRANSIT;
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
        order.status = DeliveryStatus.CANCELLED;
        await this.orderRepository.save(order);
    }

    async setStatus(orderId: string, status: DeliveryStatus): Promise<void> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw ApiError.BadRequest(`Order with id ${orderId} not found`);
        }
        order.status = status;
        await this.orderRepository.save(order);
    }

    async updateOrderPaymentStatus(orderId: string, paymentId: string): Promise<void> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw ApiError.BadRequest(`Order with id ${orderId} not found`);
        }
        order.isPaid = true;
        order.payment = paymentId;
        await this.orderRepository.save(order);
        return order;
    }
}
export default new OrderInfrastructureService(OrderPostgresRepository);
