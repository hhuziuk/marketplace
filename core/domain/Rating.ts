export class Rating {
    constructor(
        readonly ratingId: string,
        readonly userId: string,
        readonly ratingValue: number,
        readonly comment: string,
    ) {

    }
}