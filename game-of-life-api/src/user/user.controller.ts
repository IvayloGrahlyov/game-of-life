import {
  Controller,
  Get,
  UseGuards,
  Logger,
  Put,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/entities';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getMe(@CurrentUser() user: Express.User) {
    try {
      const fetchedUser: Partial<User> = await this.userService.getUserById(
        user.sub,
      );
      delete fetchedUser.passwordHash;

      return fetchedUser;
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }

  @Put()
  async updateProfile(
    @CurrentUser() user: Express.User,
    @Body() payload: UpdateUserDto,
  ) {
    if (!payload.firstName && !payload.lastName) {
      throw new BadRequestException();
    }
    try {
      await this.userService.updateUser(user.sub, payload);

      return { success: true };
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }
}
