import { inject, injectable } from 'inversify';
import { Chat } from '../domain/Chat';
import DOMAIN_TYPES from '../domain/domain-types';
import { IChatRepository } from '../domain/repositories/ChatRepository';

/**
 * Busca chat pelo nome.
 */
@injectable()
export class GetChatByNameAppService {
  @inject(DOMAIN_TYPES.IChatRepository)
  private readonly chatRepository!: IChatRepository;

  async execute(name: string): Promise<Chat> {
    return await this.chatRepository.findByName(name);
  }
}
