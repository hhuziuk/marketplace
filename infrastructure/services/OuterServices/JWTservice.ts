import {User} from "../../../core/domain/User";
import tokenInfrastructureService from "../TokenInfrastructureService";
import ApiError from "../../exceptions/ApiError";
import {UserDomainService} from "../../../core/services/UserDomainService";
import UserPostgresRepository from "../../database/PostgresRepository/UserPostgresRepository";

class JWTService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)) {
    }

    async registration(user: User) {
        const tokens = tokenInfrastructureService.generateTokens({...user})
        await tokenInfrastructureService.saveToken(user.userId, tokens.refreshToken)
        return {
            ...tokens,
            user,
        }
    }

    async login(user: User) {
        const tokens = tokenInfrastructureService.generateTokens({...user})
        await tokenInfrastructureService.saveToken(user.userId, tokens.refreshToken)
        return {
            ...tokens,
            user,
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenInfrastructureService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }
        const userData = tokenInfrastructureService.validateRefreshToken(refreshToken)
        const tokenFromDatabase = await tokenInfrastructureService.findToken(refreshToken);
        if (!userData || !tokenFromDatabase) {
            throw ApiError.Unauthorized()
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

export default new JWTService(UserPostgresRepository);