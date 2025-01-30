export class LoginModel {
  constructor(user: {
    email: string, 
    password: string,
    code?: string,
  }) {
    this.email = user.email;
    this.password = user.password;
    this.code = user.code;
  }

  email: string;
  password: string;
  code?: string;
}
