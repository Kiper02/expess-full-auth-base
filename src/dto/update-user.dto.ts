export class UpdateUserDto {
    constructor(user: {
        name: string;
        email: string;
        isTwoFactorEnable: boolean;
    }) {
        Object.assign(this, user);
    }

    name: string;
    email: string;
    isTwoFactorEnable: boolean;
}