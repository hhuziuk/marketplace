import {AuthDomainService} from "../../../core/services/AuthDomainService";
import {User} from "../../../core/domain/User";
import tokenInfrastructureService from "../TokenInfrastructureService";
import ApiError from "../../exceptions/ApiError";
import {UserDomainService} from "../../../core/services/UserDomainService";

class JWTService {
    constructor(readonly authRepository: any = new AuthDomainService(authRepository),
                readonly userRepository: any = new UserDomainService(userRepository)) {}
    async registration(user: User) {
        const tokens = tokenInfrastructureService.generateTokens({...user})
        await tokenInfrastructureService.saveToken(user.userId, tokens.refreshToken)
        return {
            ...tokens,
            user,
        }
    }
    async login(user: User){
        const tokens = tokenInfrastructureService.generateTokens({...user})
        await tokenInfrastructureService.saveToken(user.userId, tokens.refreshToken)
        return {
            ...tokens,
            user,
        }
    }
    async logout(refreshToken: string){
        const token = await tokenInfrastructureService.removeToken(refreshToken)
        return token;
    }
    async refresh(refreshToken: string){
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenInfrastructureService.validateRefreshToken(refreshToken)
        const tokenFromDatabase = await tokenInfrastructureService.findToken(refreshToken);
        if(!userData || !tokenFromDatabase){
            throw ApiError.UnauthorizedError()
        }
        const user = await this.userRepository.getById(userData.id)
        const tokens = tokenInfrastructureService.generateTokens({...user})
        await tokenInfrastructureService.saveToken(user.userId, tokens.refreshToken)
        return {
            ...tokens,
            user,
        }
    }
}