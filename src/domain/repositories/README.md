# Repository

Define os repositórios para persistir ou buscar os dados no DB.

Os repositórios são:

- [ChatRepository](./ChatRepository.ts)
  - Este repositório realiza as operações em ChatModel e MessageModel (aggregate), e em MemberModel, que é classe de junção da relação M:N entre UserModel e ChatModel.
- [UserRepository](./UserRepository.ts)
