import { IRepository } from '../../core/domain/repositories/Repository';
import { User } from '../User';

export interface IUserRepository extends IRepository<User> {
  /**
   * Busca um usuário pelo ID.
   *
   * @param id ID do usuário a ser buscado.
   * @returns instância de User.
   */
  findById(id: string): Promise<User>;

  /**
   * Busca um usuário pelo nome.
   *
   * @param name nome do usuário.
   * @returns instância de User.
   */
  findByName(name: string): Promise<User>;

  /**
   * Busca todas as instâncias de User.
   *
   * @returns um array de instâncias de User.
   */
  findAll(): Promise<User[]>;
}
