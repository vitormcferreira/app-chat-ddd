import { inject, injectable } from 'inversify';
import DOMAIN_TYPES from '../domain/domain-types';
import { IUserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/User';

/**
 * Cria um novo usuário.
 */
@injectable()
export class CreateUserAppService {
  @inject(DOMAIN_TYPES.IUserRepository)
  private readonly userRepository!: IUserRepository;

  async execute(name: string): Promise<void> {
    const user = User.create({ name });

    await this.userRepository.save(user);
  }
}
