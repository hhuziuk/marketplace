import TokenPostgresRepository from "../database/PostgresRepository/TokenPostgresRepository";
import jwt from 'jsonwebtoken'
import type { JwtPayload } from "jsonwebtoken"
import {TokenDomainService} from "../../core/services/TokenDomainService";

class TokenInfrastructureService{
    constructor(readonly tokenRepository: any = new TokenDomainService(tokenRepository)) {}
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token: any){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '') as JwtPayload
            return userData;
        } catch(e){
            return null;
        }
    }
    validateRefreshToken(token: any){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '') as JwtPayload
            return userData;
        } catch(e){
            return null;
        }
    }

    async saveToken(userId: any, refreshToken: any){
        const tokenData = await this.tokenRepository.getBy({id: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return this.tokenRepository.save(tokenData);
        }
        const token = await this.tokenRepository.create({user: userId, refreshToken})
        await this.tokenRepository.save(token)
        return token;
    }

    async removeToken(refreshToken: any){
        const tokenData = await this.tokenRepository.delete({refreshToken})
        return tokenData;
    }

    async findToken(refreshToken: any){
        const tokenData = await this.tokenRepository.getBy({refreshToken})
        return tokenData;
    }

}
export default new TokenInfrastructureService(TokenPostgresRepository);