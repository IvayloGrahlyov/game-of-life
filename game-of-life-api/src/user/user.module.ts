import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoProvider } from 'src/mongo/mongo';

@Module({
  controllers: [UserController],
  providers: [UserService, MongoProvider],
})
export class UserModule {}
