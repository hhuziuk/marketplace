import {WishlistDomainService} from "../../core/services/WishlistDomainService";

export class WishlistInfrastructureService {
    constructor(readonly wishlistRepository: any = new WishlistDomainService(wishlistRepository)){}

}