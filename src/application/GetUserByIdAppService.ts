import { inject, injectable } from 'inversify';
import DOMAIN_TYPES from '../domain/domain-types';
import { IUserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/User';

/**
 * Busca usuário pelo ID.
 */
@injectable()
export class GetUserByIdAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;

  async execute(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}
