export class WishlistBooks {
    constructor(
        readonly wishlistBooksId: string,
        readonly wishlistId: string,
        readonly bookId: string
    ) {}
}