export class NewPasswordDto {
    password: string;

    constructor(data: {password: string}) {
        this.password = data.password;
    }
}