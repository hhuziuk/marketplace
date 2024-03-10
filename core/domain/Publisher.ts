export class Publisher {
    constructor(
        readonly publisherId: string,
        readonly category: string,
        readonly bookId: string,
        readonly categoryId: string,
    ) {}
}