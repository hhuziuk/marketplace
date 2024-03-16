import {Order} from "../../domain/Order";
import {Status} from "../../domain/enums/Status";
import {Delivery} from "../../domain/enums/Delivery";

export interface OrderRepository {
    createOrder(
        orderId: string,
        createdAt: Date,
        status: Status,
        userId: string,
        wishlistId: string,
        totalPrice: number,
        paymentId: string,
        deliveryType: Delivery,
    ) : Promise<Order>,
    save(order: Order): Promise<Order>,
    getAll(): Promise<Order[]>,
    getById(orderId: string): Promise<Order | null>,
    confirmOrder(orderId: string) : Promise<Order>,
    cancelOrder(orderId: string) : Promise<void>,
    setStatus(status: Status) : Promise<void>,
}