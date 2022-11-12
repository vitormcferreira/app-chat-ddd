import { Entity } from '../core/domain/Entity';
import { UniqueIdService } from './services/UniqueIdService';

export interface UserProps {
  name: string;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  /**
   * Cria uma nova instância.
   *
   * @param props
   * @param id ID da entidade.
   * @returns uma instância.
   */
  static create(props: UserProps, id = UniqueIdService.generate()): User {
    return new User(props, id);
  }
}
