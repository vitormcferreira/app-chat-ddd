import { Container } from 'inversify';
import DOMAIN_TYPES from './src/domain/domain-types';
import { ChatRepository } from './src/infra/data/repository/ChatRepository';
import { UserRepository } from './src/infra/data/repository/UserRepository';
import { IUserRepository } from './src/domain/repositories/UserRepository';
import { IChatRepository } from './src/domain/repositories/ChatRepository';

const container = new Container();

container
  .bind<IChatRepository>(DOMAIN_TYPES.IChatRepository)
  .to(ChatRepository);
container
  .bind<IUserRepository>(DOMAIN_TYPES.IUserRepository)
  .to(UserRepository);

export { container };
