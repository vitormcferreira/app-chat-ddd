import { IRepository } from '../../core/domain/repositories/Repository';
import { Chat } from '../Chat';

export interface IChatRepository extends IRepository<Chat> {
  /**
   * Busca um chat pelo ID.
   *
   * @param id ID do chat a ser buscado.
   * @returns instância de Chat.
   */
  findById(id: string): Promise<Chat>;

  /**
   * Busca um chat pelo nome.
   *
   * @param name nome do chat.
   * @returns instância de Chat.
   */
  findByName(name: string): Promise<Chat>;

  /**
   * Busca todas as instâncias de Chat.
   *
   * @returns um array de instâncias de Chat.
   */
  findAll(): Promise<Chat[]>;
}
