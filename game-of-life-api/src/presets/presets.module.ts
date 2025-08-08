import { Module } from '@nestjs/common';
import { PresetsController } from './presets.controller';
import { PresetsService } from './presets.service';
import { MongoProvider } from 'src/mongo/mongo';

@Module({
  controllers: [PresetsController],
  providers: [PresetsService, MongoProvider],
})
export class PresetsModule {}
