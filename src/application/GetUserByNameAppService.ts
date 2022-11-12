import { inject, injectable } from 'inversify';
import DOMAIN_TYPES from '../domain/domain-types';
import { IUserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/User';

/**
 * Busca usuário pelo nome.
 */
@injectable()
export class GetUserByNameAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;

  async execute(name: string): Promise<User> {
    return await this.userRepository.findByName(name);
  }
}
