export class Rating {
    constructor(
        readonly ratingId: string,
        readonly userId: string,
        readonly bookId: string,
        readonly ratingValue: number,
        readonly comment: string,
    ) {
    }
}