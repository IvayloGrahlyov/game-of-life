import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { SavePresetDto } from './dto/save-preset.dto';
import { PresetsService } from './presets.service';

@Controller('presets')
@UseGuards(JwtAuthGuard)
export class PresetsController {
  constructor(private presetService: PresetsService) {}

  @Post()
  async savePreset(
    @CurrentUser() user: Express.User,
    @Body() body: SavePresetDto,
  ) {
    const { name, grid } = body;

    try {
      const result = await this.presetService.savePreset({
        userId: user.sub,
        name,
        grid,
      });

      return { id: result.id };
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }

  @Get()
  async listPresets(@CurrentUser() user: Express.User) {
    try {
      return this.presetService.listPresets(user.sub);
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }

  @Get(':id')
  async getPreset(@CurrentUser() user: Express.User, @Param('id') id: string) {
    try {
      const preset = await this.presetService.getPreset(user.sub, id);
      if (!preset) throw new NotFoundException();
      return preset;
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }

  @Delete(':id')
  async deletePreset(
    @CurrentUser() user: Express.User,
    @Param('id') id: string,
  ) {
    try {
      await this.presetService.deletePreset(user.sub, id);

      return { success: true };
    } catch (err) {
      Logger.error(err);
      // TODO: Implement better error handling with proper status codes
      throw err;
    }
  }
}
