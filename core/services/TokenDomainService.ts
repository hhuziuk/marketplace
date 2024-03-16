import {TokenRepository} from "../repositories/TokenRepository/TokenRepository";
import {JwtPayload} from "jsonwebtoken";
export class TokenDomainService implements TokenRepository {
    constructor(private tokenDomainRepository: TokenRepository){}
    generateTokens(payload: JwtPayload) : { accessToken: string; refreshToken: string } {
        return this.tokenDomainRepository.generateTokens(payload)
    }
    validateAccessToken(token: string): JwtPayload | null {
        return this.tokenDomainRepository.validateAccessToken(token);
    }
    validateRefreshToken(token: string): JwtPayload | null {
        return this.tokenDomainRepository.validateRefreshToken(token);
    }
}