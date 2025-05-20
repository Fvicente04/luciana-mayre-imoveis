'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leads', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome_contato: { type: Sequelize.STRING, allowNull: false },
      telefone: { type: Sequelize.STRING, allowNull: false },
      mensagem: { type: Sequelize.TEXT, allowNull: false },
      imovel_id: { type: Sequelize.INTEGER, allowNull: true },
      imovel_titulo: { type: Sequelize.STRING, allowNull: true },
      canal: {
        type: Sequelize.ENUM('formulario', 'whatsapp'),
        allowNull: false,
        defaultValue: 'formulario'
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('leads');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leads_canal"');
  }
};
