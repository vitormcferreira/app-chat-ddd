import { Sequelize } from 'sequelize-typescript';
import { ChatModel } from './models/ChatModel';
import { MemberModel } from './models/MemberModel';
import { MessageModel } from './models/MessageModel';
import { UserModel } from './models/UserModel';

/**
 * Instância do DB usado pelo app.
 */
// Como é um App somente para prática, o DB é criado em memória
const sequelize = new Sequelize('sqlite::memory', {
  logging: false,
  models: [ChatModel, MemberModel, MessageModel, UserModel],
});

export default sequelize;
