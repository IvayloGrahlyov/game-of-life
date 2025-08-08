import { Body, Controller, Logger, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return this.authService.register(dto);
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return this.authService.login(dto);
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }
}
