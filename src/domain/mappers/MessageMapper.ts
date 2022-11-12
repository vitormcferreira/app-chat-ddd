import { Mapper } from '../../core/domain/mappers/Mapper';
import { Message } from '../Message';
import { UserMapper, UserToDomainProps } from './UserMapper';

export interface MessageToDomainProps {
  id: string;
  aggregateId: string;
  chatId: string;
  author: UserToDomainProps;
  text: string;
  timestamp: Date;
}

/**
 * Mapper entre domínio e repositório de Message.
 */
export class MessageMapper implements Mapper<Message> {
  /**
   * Faz o mapping do repositório para o domínio.
   *
   * @param raw dados raw vindos do repositório.
   * @returns instância de domínio.
   */
  static toDomain(raw: MessageToDomainProps): Message {
    const author = UserMapper.toDomain(raw.author);

    const { id, text, timestamp, aggregateId, chatId } = raw;

    return Message.create({ author, text, timestamp, chatId }, aggregateId, id);
  }

  /**
   * Faz o mapping do domínio para o repositório.
   *
   * @param instance instância vinda do domínio.
   * @returns dados raw.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toPersistence(instance: Message): any {
    const { id, aggregateId, text, timestamp, chatId } = instance;

    return {
      id,
      text,
      timestamp,
      authorId: instance.author.id,
      aggregateId,
      chatId,
    };
  }
}
