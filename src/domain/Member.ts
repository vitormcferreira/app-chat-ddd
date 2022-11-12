import { Entity } from '../core/domain/Entity';
import { UniqueIdService } from './services/UniqueIdService';
import { User } from './User';

export type Cargo = 'NORMAL' | 'ADMIN';

export interface MemberProps {
  chatId: string;
  user: User;
  cargo: Cargo;
}

export class Member extends Entity<MemberProps> {
  get chatId() {
    return this.props.chatId;
  }
  get user() {
    return this.props.user;
  }
  /**
   * Cargo do usuário no grupo.
   */
  get cargo() {
    return this.props.cargo;
  }

  /**
   * Cria uma nova instância.
   *
   * @param props
   * @param id ID da entidade.
   * @returns uma instância.
   */
  static create(props: MemberProps, id = UniqueIdService.generate()): Member {
    return new Member(props, id);
  }

  /**
   * Verifica se o usuário é admin.
   * @returns true se o usuário for admin, do contrário false.
   */
  isAdmin(): boolean {
    return this.cargo === 'ADMIN';
  }

  /**
   * Verifica se o usuário é membro normal.
   * @returns true se o usuário for membro normal, do contrário false.
   */
  isNormalMember(): boolean {
    return this.cargo === 'NORMAL';
  }
}
