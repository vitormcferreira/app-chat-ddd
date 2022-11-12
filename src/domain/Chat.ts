import { remove } from 'lodash';
import { AggregateRoot } from '../core/domain/Aggregate';
import { Cargo, Member } from './Member';
import { Message } from './Message';
import { UniqueIdService } from './services/UniqueIdService';
import { User } from './User';

export interface ChatProps {
  creator: User;
  members: Member[];
  messages: Message[];
  name: string;
}

export class Chat extends AggregateRoot<ChatProps> {
  get creator() {
    return this.props.creator;
  }
  get members() {
    return this.props.members;
  }
  get messages() {
    return this.props.messages;
  }
  get name() {
    return this.props.name;
  }

  /**
   * Cria uma nova instância.
   *
   * @param props
   * @param id ID da entidade.
   * @returns uma instância.
   */
  static create(props: ChatProps, id = UniqueIdService.generate()): Chat {
    return new Chat(props, id);
  }

  /**
   * Adiciona um novo membro ao chat.
   *
   * @param user usuário a ser adicionado.
   * @param cargo cargo do usuário.
   */
  addMember(user: User, cargo: Cargo): void {
    const member = this.findMember(user);
    if (member) {
      throw new Error('user is already a chat member');
    }

    const newMember = Member.create({ cargo, chatId: this.id, user });
    this.members.push(newMember);
  }

  /**
   * Remove um membro do chat.
   *
   * @param user usuário a ser removido.
   */
  removeMember(user: User): void {
    remove(this.members, (member) => member.user.equals(user));
  }

  /**
   * Envia uma mensagem ao chat.
   *
   * @param author autor da mensagem.
   * @param text mensagem de texto.
   */
  sendMessage(author: User, text: string): void {
    const member = this.findMember(author);
    if (!member) {
      throw new Error('author must be a chat member');
    }

    const message = this.createMessage(author, text, new Date());
    this.messages.push(message);
  }

  /**
   * Cria um instância de Message.
   *
   * @param author autor da mensagem.
   * @param text mensagem de texto.
   * @param timestamp data de criação da mensagem.
   * @returns uma instância de Message.
   */
  private createMessage(author: User, text: string, timestamp: Date): Message {
    return Message.create(
      { author, text, timestamp, chatId: this.id },
      this.id,
    );
  }

  private findMember(user: User): Member | undefined {
    return this.members.find((member) => member.user.equals(user));
  }
}
