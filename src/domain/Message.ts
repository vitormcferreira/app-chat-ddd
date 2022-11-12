import { AggregateEntity } from '../core/domain/Aggregate';
import { UniqueIdService } from './services/UniqueIdService';
import { User } from './User';

export interface MessageProps {
  author: User;
  chatId: string;
  text: string;
  timestamp: Date;
}

export class Message extends AggregateEntity<MessageProps> {
  get author() {
    return this.props.author;
  }
  get chatId() {
    return this.props.chatId;
  }
  get text() {
    return this.props.text;
  }
  /**
   * Data de criação da mensagem.
   */
  get timestamp() {
    return this.props.timestamp;
  }

  /**
   * Cria uma nova instância.
   *
   * @param props
   * @param aggregateId ID do aggregate.
   * @param id ID da entidade.
   * @returns uma instância.
   */
  static create(
    props: MessageProps,
    aggregateId: string,
    id = UniqueIdService.generate(),
  ): Message {
    return new Message(props, aggregateId, id);
  }
}
