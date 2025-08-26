import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.fingByUsername(username);

    if (!user) return null;
    const isPasswordCorrect = await this.passwordService.comparePassword(
      password,
      user?.password
    );

    if (isPasswordCorrect) {
      const { username, email, _id } = user;
      return { username, email, id: _id };
    }
    return null;
  }
}
