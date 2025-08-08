import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const user = await this.userService.getUserByUsername(dto.username);
      if (user) throw new BadRequestException('User already exists');
    } catch {
      // We are OK with the user not existing
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const result = await this.userService.createUser({
      username: dto.username,
      passwordHash,
      ...(dto.firstName ? { firstName: dto.firstName } : {}),
      ...(dto.lastName ? { lastName: dto.lastName } : {}),
    });
    const jwtPayload = { sub: result.insertedId, username: dto.username };

    return {
      id: result.insertedId,
      username: dto.username,
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserByUsername(dto.username);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUserById(id: string) {
    const user = await this.userService.getUserById(id);
    return user ? { sub: user._id, username: user.username } : null;
  }
}
