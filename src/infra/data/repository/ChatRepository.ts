import { injectable } from 'inversify';
import { Chat } from '../../../domain/Chat';
import { ChatMapper } from '../../../domain/mappers/ChatMapper';
import { MemberMapper } from '../../../domain/mappers/MemberMapper';
import { MessageMapper } from '../../../domain/mappers/MessageMapper';
import { Member } from '../../../domain/Member';
import { Message } from '../../../domain/Message';
import { IChatRepository } from '../../../domain/repositories/ChatRepository';
import { ChatModel } from '../../database/sequelize/models/ChatModel';
import { MemberModel } from '../../database/sequelize/models/MemberModel';
import { MessageModel } from '../../database/sequelize/models/MessageModel';

/**
 * Repositório de Chat. Operações no repositório sobre tudo relacionado ao
 * aggregate e a classe de associação Member.
 */
@injectable()
export class ChatRepository implements IChatRepository {
  async findById(id: string): Promise<Chat> {
    const chatSeq = await ChatModel.scope('aggregate').findByPk(id);

    if (chatSeq) {
      return ChatMapper.toDomain(chatSeq);
    }

    throw new Error('chat not exists');
  }

  async findByName(name: string): Promise<Chat> {
    const chatSeq = await ChatModel.scope('aggregate').findOne({
      where: { name },
    });

    if (chatSeq) {
      return ChatMapper.toDomain(chatSeq);
    }

    throw new Error('chat not exists');
  }

  async findAll(): Promise<Chat[]> {
    const chatsSeq = await ChatModel.scope('aggregate').findAll();
    return chatsSeq.map((raw) => ChatMapper.toDomain(raw));
  }

  async exists(chat: Chat): Promise<boolean> {
    const chatSeq = await ChatModel.findByPk(chat.id);
    return chatSeq !== null;
  }

  async delete(chat: Chat): Promise<void> {
    const chatExist = await this.exists(chat);
    if (!chatExist) {
      throw new Error('chat not exists');
    }

    await this.deleteAggregateMembers(chat.id);
    await ChatModel.destroy({ where: { id: chat.id } });
  }

  // inimigo da performance
  async save(chat: Chat): Promise<void> {
    const chatRaw = ChatMapper.toPersistence(chat);
    const [chatSeq, created] = await ChatModel.findOrCreate({
      where: { id: chat.id },
      defaults: chatRaw,
    });

    if (!created) {
      await chatSeq.update(chatRaw);
      await this.deleteAggregateMembers(chat.id);
      await this.deleteMembers(chat.id);
    }

    await this.saveMembers(chat.members);
    await this.saveMessages(chat.messages);
  }

  private async deleteAggregateMembers(aggregateId: string): Promise<void> {
    await this.deleteMessages(aggregateId);
  }

  private async deleteMessages(aggregateId: string): Promise<void> {
    await MessageModel.destroy({ where: { aggregateId } });
  }

  private async deleteMembers(chatId: string): Promise<void> {
    await MemberModel.destroy({ where: { chatId } });
  }

  private async saveMessages(messages: Message[]): Promise<void> {
    const messagesRaw = messages.map((m) => MessageMapper.toPersistence(m));
    await MessageModel.bulkCreate(messagesRaw);
  }

  private async saveMembers(members: Member[]): Promise<void> {
    const membersRaw = members.map((m) => MemberMapper.toPersistence(m));
    await MemberModel.bulkCreate(membersRaw);
  }
}
