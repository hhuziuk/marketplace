import {Order, OrderItem} from "../../domain/Order";
import {DeliveryStatus} from "../../domain/enums/DeliveryStatus";
import {Delivery} from "../../domain/enums/Delivery";

export interface OrderRepository {
    createOrder(
        orderId: string,
        createdAt: Date,
        status: DeliveryStatus,
        userId: string,
        orderItems: OrderItem[],
        totalPrice: number,
        paymentId: string,
        deliveryType: Delivery,
    ) : Promise<Order>,
    save(order: Order): Promise<Order>,
    getAll(): Promise<Order[]>,
    getById(orderId: string): Promise<Order | null>,
    confirmOrder(orderId: string) : Promise<Order>,
    cancelOrder(orderId: string) : Promise<void>,
    setStatus(status: DeliveryStatus) : Promise<void>,
}