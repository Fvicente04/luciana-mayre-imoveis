'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('depoimentos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome_cliente: { type: Sequelize.STRING, allowNull: false },
      texto: { type: Sequelize.TEXT, allowNull: false },
      nota: { type: Sequelize.INTEGER, allowNull: false },
      ativo: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('depoimentos');
  }
};
