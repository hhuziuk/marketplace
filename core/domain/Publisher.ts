export class Publisher {
    constructor(
        readonly publisherId: string,
        readonly category: string,
        readonly bookId: number,
        readonly categoryId: string,
    ) {}
}