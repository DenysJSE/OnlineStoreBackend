import {Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {UserDto} from "./dto/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') userId: number) {
    return this.userService.getUserById(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorites( @CurrentUser('id') id: number, @Param('productId') productId: string) {
    return this.userService.toggleFavorite(id, +productId)
  }
}
