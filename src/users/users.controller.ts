import { Body, Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<User> {
    return await this.usersService.findOne(name);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.deleteOne(id);
  }
}
