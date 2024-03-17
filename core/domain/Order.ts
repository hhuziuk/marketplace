import {Status} from "./enums/Status";
import {Delivery} from "./enums/Delivery";

export class Order {
    constructor(
        readonly orderId: string,
        readonly createdAt: Date,
        readonly status: Status,
        readonly userId: string,
        readonly orderItems: OrderItem[],
        readonly totalPrice: number,
        readonly paymentId: string,
        readonly deliveryType: Delivery,
    ) {}
}

export class OrderItem {
    constructor(
        readonly bookId: string,
        readonly quantity: number
    ) {}
}