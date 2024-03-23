import {CategoryDomainService} from "../../core/services/CategoryDomainService";

export class CategoryInfrastructureService {
    constructor(readonly categoryRepository: any = new CategoryDomainService(categoryRepository)){}

}