import {BookDomainService} from "../../core/services/BookDomainService";
export class BookInfrastructureService {
    constructor(readonly bookRepository: any = new BookDomainService(bookRepository)){}

}