import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ConflictException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PasswordService } from '../password/password.service';
import { Request as ExpressRequest } from 'express';

// Добавить интерфейс
interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    username: string;
  };
}

@Controller(`auth`)
export class AuthController {
  constructor(
    private userService: UserService,
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

    const tokens = await this.authService.generateTokens(validateUser);

    await this.authService.updateRefreshToken(
      validateUser.id,
      tokens.refreshToken
    );

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post(`refresh`)
  async refresh(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token не предоставлен');
    }

    const user = await this.authService.validateRefreshToken(refresh_token);

    if (!user) {
      throw new UnauthorizedException('Недействительный refresh token');
    }

    const tokens = await this.authService.generateTokens({
      username: user.username,
      id: user.id,
    });

    // Обновляем refresh token в базе данных
    await this.authService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(`/profile`)
  async getProfile(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.fingByUsername(req.user.username);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post(`logout`)
  async logout(@Req() req: AuthenticatedRequest) {
    await this.authService.logout(req.user.userId);
    return { message: 'Успешный выход из системы' };
  }
}
