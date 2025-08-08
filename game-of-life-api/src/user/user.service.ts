import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectId, WithId } from 'mongodb';
import { User } from 'src/common/entities';

@Injectable()
export class UserService {
  constructor(@Inject('MONGO_CLIENT') private db: Db) {}

  async getUserByUsername(username: string) {
    const user = await this.db
      .collection('users')
      .findOne<WithId<User>>({ username });

    if (!user) throw new NotFoundException();

    return user;
  }

  async getUserById(id: string) {
    const user = await this.db
      .collection('users')
      .findOne<WithId<User>>({ _id: new ObjectId(id) });
    if (!user) throw new NotFoundException();

    return user;
  }

  async createUser(payload: User) {
    return await this.db.collection('users').insertOne({
      ...payload,
      createdAt: new Date(),
    });
  }

  async updateUser(userId: string, payload: Partial<User>) {
    return await this.db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: payload });
  }

  async deleteUser(userId: string) {
    return await this.db
      .collection('users')
      .deleteOne({ _id: new ObjectId(userId) });
  }
}
