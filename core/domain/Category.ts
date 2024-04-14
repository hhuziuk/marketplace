export class Category {
    constructor(
        readonly categoryId: string,
        readonly category: string,
        readonly bookId: string,
        readonly publisherId: string,
    ) {}
}