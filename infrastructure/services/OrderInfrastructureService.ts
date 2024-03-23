import {OrderDomainService} from "../../core/services/OrderDomainService";

export class OrderInfrastructureService {
    constructor(readonly orderRepository: any = new OrderDomainService(orderRepository)){}

}