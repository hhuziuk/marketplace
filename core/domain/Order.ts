import {DeliveryStatus} from "./enums/DeliveryStatus";
import {Delivery} from "./enums/Delivery";

export class Order {
    constructor(
        readonly orderId: string,
        readonly createdAt: Date,
        readonly status: DeliveryStatus,
        readonly userId: string,
        readonly orderItems: OrderItem[],
        readonly amount: number,
        readonly paymentId: string,
        readonly deliveryType: Delivery,
        readonly shipmentId?: string,
    ) {
    }
}

export class OrderItem {
    constructor(
        readonly bookId: string,
        readonly quantity: number
    ) {
    }
}