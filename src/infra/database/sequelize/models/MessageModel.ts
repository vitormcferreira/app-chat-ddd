import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ChatModel } from './ChatModel';
import { UserModel } from './UserModel';

@Table({ tableName: 'messages' })
export class MessageModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare text: string;

  @Column
  declare timestamp: Date;

  @ForeignKey(() => ChatModel)
  declare chatId: ChatModel['id'];
  @BelongsTo(() => ChatModel, 'chatId')
  declare chat: ChatModel;

  @ForeignKey(() => ChatModel)
  declare aggregateId: string;
  @BelongsTo(() => ChatModel, 'aggregateId')
  declare aggregateRoot: ChatModel;

  @ForeignKey(() => UserModel)
  declare authorId: UserModel['id'];
  @BelongsTo(() => UserModel, 'authorId')
  declare author: UserModel;
}
