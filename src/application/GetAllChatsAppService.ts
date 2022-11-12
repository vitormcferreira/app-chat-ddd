import { inject, injectable } from 'inversify';
import { Chat } from '../domain/Chat';
import DOMAIN_TYPES from '../domain/domain-types';
import { IChatRepository } from '../domain/repositories/ChatRepository';

/**
 * Busca todos os chats.
 */
@injectable()
export class GetAllChatsAppService {
  @inject(DOMAIN_TYPES.IChatRepository)
  private readonly chatRepository!: IChatRepository;

  async execute(): Promise<Chat[]> {
    return await this.chatRepository.findAll();
  }
}
