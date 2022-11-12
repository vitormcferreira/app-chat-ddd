/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mapper } from '../../core/domain/mappers/Mapper';
import { Cargo, Member } from '../Member';
import { UserMapper, UserToDomainProps } from './UserMapper';

export interface MemberToDomainProps {
  chatId: string;
  user: UserToDomainProps;
  cargo: Cargo;
}

/**
 * Mapper entre domínio e repositório de Member.
 */
export class MemberMapper implements Mapper<Member> {
  /**
   * Faz o mapping do repositório para o domínio.
   *
   * @param raw dados raw vindos do repositório.
   * @returns instância de domínio.
   */
  static toDomain(raw: MemberToDomainProps): Member {
    const { cargo, chatId } = raw;

    const user = UserMapper.toDomain(raw.user);
    return Member.create({ cargo, chatId, user });
  }

  /**
   * Faz o mapping do domínio para o repositório.
   *
   * @param instance instância vinda do domínio.
   * @returns dados raw.
   */
  static toPersistence(instance: Member): any {
    const { cargo, chatId } = instance;

    return {
      chatId,
      userId: instance.user.id,
      cargo,
    };
  }
}
