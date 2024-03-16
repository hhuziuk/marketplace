import {OrderRepository} from "../repositories/OrderRepository/OrderRepository";
import {Order} from "../domain/Order";
import {Status} from "../domain/enums/Status";
import {Delivery} from "../domain/enums/Delivery";

export class OrderDomainService implements OrderRepository {
    constructor(private orderDomainRepository: OrderRepository){}
    async createOrder(
        orderId: string,
        createdAt: Date,
        status: Status,
        userId: string,
        wishlistId: string,
        totalPrice: number,
        paymentId: string,
        deliveryType: Delivery,
    ) : Promise<Order> {
        return await this.orderDomainRepository.createOrder(orderId, createdAt, status, userId, wishlistId, totalPrice, paymentId, deliveryType);
    }
    async confirmOrder(orderId: string) : Promise<Order> {
        return await this.orderDomainRepository.confirmOrder(orderId);
    }
    async save(order: Order) : Promise<Order> {
        return await this.orderDomainRepository.save(order);
    }
    async getAll() : Promise<Order[]> {
        return await this.orderDomainRepository.getAll();
    }
    async getById(orderId: string) : Promise<Order | null> {
        return await this.orderDomainRepository.getById(orderId);
    }
    async cancelOrder(orderId: string) : Promise<void> {
        return await this.orderDomainRepository.cancelOrder(orderId);
    }
    async setStatus(status: Status) : Promise<void> {
        return await this.orderDomainRepository.setStatus(status);
    }
}