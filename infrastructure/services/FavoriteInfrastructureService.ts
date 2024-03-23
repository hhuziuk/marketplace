import {FavoriteDomainService} from "../../core/services/FavoriteDomainService";

export class FavoriteInfrastructureService {
    constructor(readonly favoriteRepository: any = new FavoriteDomainService(favoriteRepository)){}

}