export class Book {
    constructor(
        readonly bookId: string | number,
        readonly bookName: string,
        readonly author: string,
        readonly categoryId: string,
        readonly publisherId: string,
        readonly ratingId: string,
        readonly description: string,
        readonly ISBN: string,
        readonly language: string,
        readonly size: string,
        readonly price: number,
    ) {}
}