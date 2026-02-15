import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const USER_API = process.env.USER_APP_API_URL ?? 'http://localhost:3001';

@Injectable()
export class UseAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${USER_API}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      request.user = {
        id: response.data.id,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
