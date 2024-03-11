import {OrderRepository} from "../repositories/OrderRepository/OrderRepository";
import {Order} from "../domain/Order";
import {Status} from "../domain/enums/Status";

export class OrderDomainService implements OrderRepository {
    constructor(private orderDomainRepository: OrderRepository){}
    async confirmOrder(orderId: string) : Promise<Order> {
        return await this.orderDomainRepository.confirmOrder(orderId);
    }
    async cancelOrder(orderId: string) : Promise<void> {
        return await this.orderDomainRepository.cancelOrder(orderId);
    }
    async setStatus(status: Status) : Promise<void> {
        return await this.orderDomainRepository.setStatus(status);
    }
}