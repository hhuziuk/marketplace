export class Category {
    constructor(
        readonly categoryId: string,
        readonly category: string,
        readonly bookId: number,
        readonly publisherId: string,
    ) {

    }
}