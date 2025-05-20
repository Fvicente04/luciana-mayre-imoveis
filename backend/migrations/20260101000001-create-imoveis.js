'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imoveis', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      titulo: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      tipo: {
        type: Sequelize.ENUM('apartamento', 'casa', 'studio', 'comercial', 'terreno'),
        allowNull: false
      },
      finalidade: { type: Sequelize.ENUM('venda', 'aluguel'), allowNull: false },
      preco: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      condominio: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      iptu: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      area: { type: Sequelize.DECIMAL(8, 2), allowNull: false },
      quartos: { type: Sequelize.INTEGER, allowNull: false },
      banheiros: { type: Sequelize.INTEGER, allowNull: false },
      suites: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      vagas: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      andar: { type: Sequelize.INTEGER, allowNull: true },
      descricao: { type: Sequelize.TEXT, allowNull: false },
      endereco: { type: Sequelize.STRING, allowNull: false },
      bairro: { type: Sequelize.STRING, allowNull: false },
      cidade: { type: Sequelize.STRING, allowNull: false },
      estado: { type: Sequelize.STRING(2), allowNull: false },
      cep: { type: Sequelize.STRING(9), allowNull: false },
      latitude: { type: Sequelize.DECIMAL(10, 8), allowNull: true },
      longitude: { type: Sequelize.DECIMAL(11, 8), allowNull: true },
      destaque: { type: Sequelize.BOOLEAN, defaultValue: false },
      ativo: { type: Sequelize.BOOLEAN, defaultValue: true },
      fotos: { type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: [] },
      foto_principal: { type: Sequelize.TEXT, allowNull: false, defaultValue: '' },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, allowNull: true }
    });

    await queryInterface.addIndex('imoveis', ['tipo']);
    await queryInterface.addIndex('imoveis', ['finalidade']);
    await queryInterface.addIndex('imoveis', ['bairro']);
    await queryInterface.addIndex('imoveis', ['destaque']);
    await queryInterface.addIndex('imoveis', ['ativo']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('imoveis');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_imoveis_tipo"');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_imoveis_finalidade"');
  }
};
