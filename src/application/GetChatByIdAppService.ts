import { inject, injectable } from 'inversify';
import { Chat } from '../domain/Chat';
import DOMAIN_TYPES from '../domain/domain-types';
import { IChatRepository } from '../domain/repositories/ChatRepository';

/**
 * Busca chat por ID.
 */
@injectable()
export class GetChatByIdAppService {
  @inject(DOMAIN_TYPES.IChatRepository)
  private readonly chatRepository!: IChatRepository;

  async execute(id: string): Promise<Chat> {
    return await this.chatRepository.findById(id);
  }
}
