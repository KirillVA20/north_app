import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('by-email')
  async findByEmail(@Query('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Get('by-username/:username')
  async findByUsername(
    @Param('username') username: string
  ): Promise<User | null> {
    return this.userService.fingByUsername(username);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }
}
