import App from './App';
import { container } from './inversify.config';
import { AddMemberAppService } from './src/application/AddMemberAppService';
import { CreateChatAppService } from './src/application/CreateChatAppService';
import { CreateUserAppService } from './src/application/CreateUserAppService';
import { GetAllChatsAppService } from './src/application/GetAllChatsAppService';
import { GetAllUsersAppService } from './src/application/GetAllUsersAppService';
import { GetChatByNameAppService } from './src/application/GetChatByNameAppService';
import { GetUserByNameAppService } from './src/application/GetUserByNameAppService';
import { SendMessageAppService } from './src/application/SendMessageAppService';
import { ChatRepository } from './src/infra/data/repository/ChatRepository';
import { ChatModel } from './src/infra/database/sequelize/models/ChatModel';

const sendMessage = container.resolve(SendMessageAppService);
const createUser = container.resolve(CreateUserAppService);
const createChat = container.resolve(CreateChatAppService);
const getUserByName = container.resolve(GetUserByNameAppService);
const getChatByName = container.resolve(GetChatByNameAppService);
const getAllUsers = container.resolve(GetAllUsersAppService);
const getAllChats = container.resolve(GetAllChatsAppService);
const addMember = container.resolve(AddMemberAppService);
const chatRepository = container.resolve(ChatRepository);

const app = new App();

app.init(async () => {
  const vitorName = 'vitor';
  const matheusName = 'matheus';
  const joaoName = 'joao';

  await createUser.execute(vitorName);
  await createUser.execute(matheusName);
  await createUser.execute(joaoName);

  const matheus = await getUserByName.execute(matheusName);
  const joao = await getUserByName.execute(joaoName);
  const vitor = await getUserByName.execute(vitorName);

  const chatName = 'chat do vitor';
  await createChat.execute(vitor.id, chatName);
  const chat = await getChatByName.execute(chatName);

  await addMember.execute(chat.id, matheus.id);
  await addMember.execute(chat.id, joao.id);

  await sendMessage.execute(vitor.id, chat.id, 'boa noite');

  const c = await getChatByName.execute(chat.name);
  console.log(c);
});
