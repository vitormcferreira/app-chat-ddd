import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ChatModel } from './ChatModel';
import { MemberModel } from './MemberModel';
import { MessageModel } from './MessageModel';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare name: string;

  @HasMany(() => MessageModel, 'authorId')
  declare messages: MessageModel[];

  @HasMany(() => MemberModel, 'userId')
  declare members: MemberModel[];

  @HasMany(() => ChatModel, 'creatorId')
  declare myChats: ChatModel[];

  @BelongsToMany(() => ChatModel, () => MemberModel, 'userId')
  declare chats: ChatModel[];
}
