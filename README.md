# Chat app

Chat app básico criado para aplicar alguns conceitos de Domain Driven Design.

## Camadas

O programa está divididos em camadas, são elas:

- [core](./src/core/): Onde estão classes do DDD para herança. Ex.: classe Entity.
- [application](./src/application/): Onde estão as funcionalidades do App.
- [domain](./src/domain/): Onde o modelo de domínio é definido.
- [infra](./src/infra/): Onde estão definidos o DB e os repositórios.

### Conceitos

DDD, arquitetura de camadas, separação de conceitos, injeção de dependencias, diagrama de classes UML.

### Conceitos de Domain Driven Design aplicados:

- Entities
- Value objects
- Aggregates
- Repositories
- Factories (implementado através do método static `.create()` dos modelos)
- Services

### Tecnologias usadas:

- Typescript
- Sequelize
- Inversify
