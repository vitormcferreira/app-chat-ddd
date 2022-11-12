/**
 * Uma entidade do modelo.
 */
export abstract class Entity<Props> {
  protected constructor(
    protected props: Props,
    protected readonly _id: string,
  ) {}

  /**
   * ID da entidade.
   */
  get id() {
    return this._id;
  }

  /**
   * Testa se duas entidades são iguais (possuem o mesmo ID).
   *
   * @param other outra entidade.
   * @returns true se tiverem o mesmo ID, do contrário false.
   */
  equals(other: Entity<Props>) {
    return this.id === other.id;
  }
}
