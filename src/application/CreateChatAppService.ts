import { inject, injectable } from 'inversify';
import { Chat } from '../domain/Chat';
import DOMAIN_TYPES from '../domain/domain-types';
import { IChatRepository } from '../domain/repositories/ChatRepository';
import { IUserRepository } from '../domain/repositories/UserRepository';

/**
 * Cria um novo chat.
 */
@injectable()
export class CreateChatAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;
  @inject(DOMAIN_TYPES.IChatRepository)
  private readonly chatRepository!: IChatRepository;

  async execute(creatorId: string, name: string): Promise<void> {
    const creator = await this.userRepository.findById(creatorId);
    const chat = Chat.create({ creator, name, members: [], messages: [] });

    chat.addMember(creator, 'ADMIN');

    await this.chatRepository.save(chat);
  }
}
