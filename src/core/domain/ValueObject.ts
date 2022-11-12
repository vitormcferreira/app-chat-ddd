import { clone, isEqualWith } from 'lodash';
import { Entity } from './Entity';

/**
 * Value Object
 */
export abstract class ValueObject<Props> {
  constructor(protected props: Props) {}

  /**
   * Testa se é igual a outro value object.
   *
   * @param other outro Value Object.
   * @returns true se um value object é igual a outro (todos os campos iguais),
   * do contrário false.
   */
  equals(other: ValueObject<Props>): boolean {
    const isEqual = isEqualWith(this.props, other.props, (value, other) => {
      const isEntity = value instanceof Entity;
      const isValueObject = value instanceof ValueObject;

      if (isEntity || isValueObject) {
        return value.equals(other);
      }
    });

    return isEqual;
  }

  /**
   * Clona o value object.
   *
   * @returns uma cópia deste value object
   */
  clone(): this {
    return clone(this);
  }
}
