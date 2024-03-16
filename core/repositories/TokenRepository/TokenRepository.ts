import {JwtPayload} from "jsonwebtoken";
export interface TokenRepository {
    generateTokens(payload: JwtPayload): { accessToken: string; refreshToken: string };
    validateAccessToken(token: string): JwtPayload | null;
    validateRefreshToken(token: string): JwtPayload | null;
}