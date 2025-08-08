import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongoProvider } from 'src/mongo/mongo';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, MongoProvider, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
