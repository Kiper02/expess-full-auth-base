export class ResetPasswordDto {
    email: string;

    constructor(data: {email: string}) {
        this.email = data.email;
    }
}