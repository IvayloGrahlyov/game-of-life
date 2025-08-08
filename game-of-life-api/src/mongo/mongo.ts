import { MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';

export const MongoProvider = {
  provide: 'MONGO_CLIENT',
  useFactory: async (configService: ConfigService) => {
    const uri =
      configService.get<string>('MONGO_URI') ||
      'mongodb://root:example@localhost:27017';
    const client = new MongoClient(uri);
    await client.connect();
    return client.db('game-of-life');
  },
};
