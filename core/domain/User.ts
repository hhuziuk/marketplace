import {Role} from "./enums/Role";

export class User {
    constructor(
        readonly userId: string,
        readonly username: string,
        readonly name: string,
        readonly surname: string,
        readonly email: string,
        readonly password: string,
        // readonly isActivated: boolean,
        // readonly activationLink: string,
        readonly phoneNumber: string,
        readonly country: string,
        readonly city: string,
        readonly postalCode: string,
        readonly address: string,
        readonly role: Role,
        public verified: boolean,
    ) {}
}