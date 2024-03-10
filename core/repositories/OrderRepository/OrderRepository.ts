import {Order} from "../../domain/Order";
import {Status} from "../../domain/enums/Status";

export interface OrderRepository {
    confirmOrder(orderId: string) : Promise<Order>,
    cancelOrder(orderId: string) : Promise<void>,
    setStatus(status: Status) : Promise<void>,
}