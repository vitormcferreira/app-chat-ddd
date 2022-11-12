import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatModel } from './ChatModel';
import { UserModel } from './UserModel';

@Table({ tableName: 'members' })
export class MemberModel extends Model {
  @Column
  declare cargo: 'NORMAL' | 'ADMIN';

  @ForeignKey(() => UserModel)
  declare userId: UserModel['id'];
  @BelongsTo(() => UserModel, 'userId')
  declare user: UserModel;

  @ForeignKey(() => ChatModel)
  declare chatId: ChatModel['id'];
  @BelongsTo(() => ChatModel, 'chatId')
  declare chat: ChatModel;
}
