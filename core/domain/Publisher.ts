export class Publisher {
    constructor(
        readonly publisherId: string,
        readonly publisherName: string,
        readonly bookId: string,
        readonly categoryId: string,
    ) {
    }
}