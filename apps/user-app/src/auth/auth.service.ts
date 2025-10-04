import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './const';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService
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
      return { username, email, id: _id as string };
    }
    return null;
  }

  async generateTokens(user: any) {
    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.accessTokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.passwordService.hashPassword(
      refreshToken
    );
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      const user = await this.userService.findById(payload.sub);
      if (!user || !user.refreshToken) {
        return null;
      }

      const isRefreshTokenValid = await this.passwordService.comparePassword(
        refreshToken,
        user.refreshToken
      );

      if (isRefreshTokenValid) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }
}
