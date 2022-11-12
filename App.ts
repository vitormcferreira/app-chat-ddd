import sequelize from './src/infra/database/sequelize';

export default class App {
  async init(cb: () => void): Promise<void> {
    await sequelize.sync({ force: true });
    cb();
  }
}
