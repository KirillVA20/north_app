import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PasswordService } from '../password/password.service';

@Controller(`auth`)
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
    private passwordService: PasswordService
  ) {}

  @Post(`signup`)
  async signUp(@Body() body: User) {
    const isUserExists = await this.userService.findByEmail(body.email);
    const isNickNameExists = await this.userService.fingByUsername(
      body.username
    );
    if (isUserExists || isNickNameExists) {
      throw new ConflictException('Такой пользователь уже существует');
    }
    body.password = await this.passwordService.hashPassword(body.password);
    const newUser = await this.userService.create(body);
    return newUser;
  }

  @HttpCode(HttpStatus.OK)
  @Post(`signin`)
  async signIn(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    if (!username || !password) return `Поля пустые`;

    const validateUser = await this.authService.validateUser(
      username,
      password
    );

    if (!validateUser)
      throw new UnauthorizedException('Неверный юзернейм или пароль');

    const payload = { username: validateUser.username, sub: validateUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(`/profile`)
  async getProfile(@Request() req) {
    const user = await this.userService.fingByUsername(req.user.username);

    return user;
  }
}
