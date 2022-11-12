/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mapper } from '../../core/domain/mappers/Mapper';
import { Chat } from '../Chat';
import { MemberMapper, MemberToDomainProps } from './MemberMapper';
import { MessageMapper, MessageToDomainProps } from './MessageMapper';
import { UserMapper, UserToDomainProps } from './UserMapper';

export interface ChatToDomainProps {
  id: string;
  name: string;
  creator: UserToDomainProps;
  members: MemberToDomainProps[];
  messages: MessageToDomainProps[];
}

/**
 * Mapper entre domínio e repositório de Chat.
 */
export class ChatMapper implements Mapper<Chat> {
  /**
   * Faz o mapping do repositório para o domínio.
   *
   * @param raw dados raw vindos do repositório.
   * @returns instância de domínio.
   */
  static toDomain(raw: ChatToDomainProps): Chat {
    const { id, name } = raw;

    const creator = UserMapper.toDomain(raw.creator);

    const members = raw.members.map((m) => MemberMapper.toDomain(m));

    const messages = raw.messages.map((m) => MessageMapper.toDomain(m));

    return Chat.create({ creator, members, messages, name }, id);
  }

  /**
   * Faz o mapping do domínio para o repositório.
   *
   * @param instance instância vinda do domínio.
   * @returns dados raw.
   */
  static toPersistence(instance: Chat): any {
    const { id, name } = instance;

    return {
      id,
      name,
      creatorId: instance.creator.id,
    };
  }
}
