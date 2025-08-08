import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { SavePresetDto } from './dto/save-preset.dto';

@Injectable()
export class PresetsService {
  constructor(@Inject('MONGO_CLIENT') private db: Db) {}

  async savePreset({ name, grid, userId }: SavePresetDto & { userId: string }) {
    const preset = await this.db.collection('presets').findOne({
      name,
      userId,
    });
    if (preset)
      throw new BadRequestException('Preset with this name already exists');

    const result = await this.db.collection('presets').insertOne({
      userId: new ObjectId(userId),
      name,
      grid,
      createdAt: new Date(),
    });

    return { id: result.insertedId };
  }

  async listPresets(userId: string) {
    return this.db
      .collection('presets')
      .find({ userId: new ObjectId(userId) })
      .toArray();
  }

  async getPreset(userId: string, presetId: string) {
    const preset = await this.db.collection('presets').findOne({
      _id: new ObjectId(presetId),
      userId: new ObjectId(userId),
    });

    if (!preset) return { error: 'Not found' };
    return preset;
  }

  async deletePreset(userId: string, presetId: string) {
    await this.db.collection('presets').deleteOne({
      _id: new ObjectId(presetId),
      userId: new ObjectId(userId),
    });

    return { success: true };
  }
}
