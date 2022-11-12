import { Mapper } from '../../core/domain/mappers/Mapper';
import { User } from '../User';

export interface UserToDomainProps {
  id: string;
  name: string;
}

/**
 * Mapper entre domínio e repositório de User.
 */
export class UserMapper implements Mapper<User> {
  /**
   * Faz o mapping do repositório para o domínio.
   *
   * @param raw dados raw vindos do repositório.
   * @returns instância de domínio.
   */
  static toDomain(raw: UserToDomainProps): User {
    const { id, name } = raw;
    return User.create({ name }, id);
  }

  /**
   * Faz o mapping do domínio para o repositório.
   *
   * @param instance instância vinda do domínio.
   * @returns dados raw.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toPersistence(instance: User): any {
    const { id, name } = instance;
    return { id, name };
  }
}
