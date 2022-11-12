import { injectable } from 'inversify';
import { UserMapper } from '../../../domain/mappers/UserMapper';
import { IUserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/User';
import { UserModel } from '../../database/sequelize/models/UserModel';

/**
 * Repositório de User.
 */
@injectable()
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User> {
    const userSeq = await UserModel.findByPk(id);
    if (userSeq) {
      return UserMapper.toDomain(userSeq.toJSON());
    }

    throw new Error('user not exists');
  }

  async findByName(name: string): Promise<User> {
    const userSeq = await UserModel.findOne({ where: { name } });
    if (userSeq) {
      return UserMapper.toDomain(userSeq.toJSON());
    }

    throw new Error('user not exists');
  }

  async findAll(): Promise<User[]> {
    const usersSeq = await UserModel.findAll();
    return usersSeq.map((raw) => UserMapper.toDomain(raw.toJSON()));
  }

  async exists(user: User): Promise<boolean> {
    const userSeq = await UserModel.findByPk(user.id);
    return userSeq !== null;
  }

  async delete(user: User): Promise<void> {
    const userExist = await this.exists(user);
    if (!userExist) {
      throw new Error('user not exists');
    }

    await UserModel.destroy({ where: { id: user.id } });
  }

  async save(user: User): Promise<void> {
    const userRaw = UserMapper.toPersistence(user);
    const [userSeq] = await UserModel.findOrBuild({ where: { id: user.id } });

    userSeq.set(userRaw);
    await userSeq.save();
  }
}
