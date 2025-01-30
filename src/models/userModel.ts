export class UserModel {
  constructor(user: { name: string; email: string; password: string }) {
    Object.assign(this, user);
  }

  name: string;
  email: string;
  password: string;
}
