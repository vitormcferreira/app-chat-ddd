import { v4 as uuidv4 } from 'uuid';

/**
 * Serviço para geração de IDs.
 */
export abstract class UniqueIdService {
  /**
   * Gera um ID.
   *
   * @returns um ID único.
   */
  static generate(): string {
    return uuidv4();
  }
}
