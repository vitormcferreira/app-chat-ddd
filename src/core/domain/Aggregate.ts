import { Entity } from './Entity';

/**
 * Raiz de um aggregate.
 */
export abstract class AggregateRoot<Props> extends Entity<Props> {}

/**
 * Membro de um aggregate.
 */
export abstract class AggregateEntity<Props> extends Entity<Props> {
  private _aggregateId: string;

  // id unico dentro do aggregate
  constructor(props: Props, aggregateId: string, id: string) {
    super(props, id);
    this._aggregateId = aggregateId;
  }

  /**
   * ID da raiz do aggregate.
   */
  get aggregateId() {
    return this._aggregateId;
  }
}
