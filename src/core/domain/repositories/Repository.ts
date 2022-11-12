/**
 * Interface comum para os repositórios do domínio.
 */
export interface IRepository<T> {
  /**
   * Verifica a existência de um objeto.
   *
   * @param obj objeto a ser verificado a existência.
   */
  exists(obj: T): Promise<boolean>;
  /**
   * Deleta um objeto.
   *
   * @param obj objeto a ser deletado.
   */
  delete(obj: T): Promise<void>;
  /**
   * Persiste um objeto.
   *
   * @param obj objeto a ser persistido.
   */
  save(obj: T): Promise<void>;
}
