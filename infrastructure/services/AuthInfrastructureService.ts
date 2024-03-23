import {AuthDomainService} from "../../core/services/AuthDomainService";

export class AuthInfrastructureService {
    constructor(readonly authRepository: any = new AuthDomainService(authRepository)){}

}