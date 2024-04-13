export class Parcel {
    constructor(
        readonly parcelId: string,
        readonly shipmentId: number,
        readonly userId: number,
        readonly weight: number,
        readonly length: number,
        readonly width: number,
        readonly height: number,
    ) {}
}