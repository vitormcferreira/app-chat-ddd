import { inject, injectable } from 'inversify';
import DOMAIN_TYPES from '../domain/domain-types';
import { IChatRepository } from '../domain/repositories/ChatRepository';
import { IUserRepository } from '../domain/repositories/UserRepository';

/**
 * Adiciona um novo membro ao chat.
 */
@injectable()
export class AddMemberAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;
  @inject(DOMAIN_TYPES.IChatRepository)
  private readonly chatRepository!: IChatRepository;

  async execute(chatId: string, userId: string): Promise<void> {
    const chat = await this.chatRepository.findById(chatId);
    const user = await this.userRepository.findById(userId);

    chat.addMember(user, 'NORMAL');

    await this.chatRepository.save(chat);
  }
}
