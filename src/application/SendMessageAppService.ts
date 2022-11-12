import { inject, injectable } from 'inversify';
import DOMAIN_TYPES from '../domain/domain-types';
import { IChatRepository } from '../domain/repositories/ChatRepository';
import { IUserRepository } from '../domain/repositories/UserRepository';

/**
 * Envia uma mensagem ao chat.
 */
@injectable()
export class SendMessageAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;
  @inject(DOMAIN_TYPES.IChatRepository)
  private readonly chatRepository!: IChatRepository;

  async execute(authorId: string, chatId: string, text: string): Promise<void> {
    const author = await this.userRepository.findById(authorId);
    const chat = await this.chatRepository.findById(chatId);

    chat.sendMessage(author, text);

    await this.chatRepository.save(chat);
  }
}
