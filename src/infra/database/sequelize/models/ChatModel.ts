import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { MemberModel } from './MemberModel';
import { MessageModel } from './MessageModel';
import { UserModel } from './UserModel';

@Table({ tableName: 'chats' })
@Scopes(() => ({
  // inclui todas as tabelas no escopo do aggregate
  aggregate: {
    include: [
      'creator',
      {
        model: MessageModel,
        as: 'messages',
        include: ['author'],
      },
      { model: MemberModel, as: 'members', include: ['user'] },
    ],
  },
}))
export class ChatModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare name: string;

  @ForeignKey(() => UserModel)
  declare creatorId: UserModel['id'];
  @BelongsTo(() => UserModel, 'creatorId')
  declare creator: UserModel;

  @HasMany(() => MessageModel, 'chatId')
  declare messages: MessageModel[];

  @HasMany(() => MemberModel, 'chatId')
  declare members: MemberModel[];

  @BelongsToMany(() => UserModel, () => MemberModel, 'chatId')
  declare users: UserModel[];
}
