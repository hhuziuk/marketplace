export class Token {
    constructor(
        readonly tokenId: string,
        readonly userId: string,
        readonly refreshToken: string
    ) {}
}