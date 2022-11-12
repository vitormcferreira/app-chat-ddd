import { inject, injectable } from 'inversify';
import DOMAIN_TYPES from '../domain/domain-types';
import { IUserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/User';

/**
 * Busca todos os usuários.
 */
@injectable()
export class GetAllUsersAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
