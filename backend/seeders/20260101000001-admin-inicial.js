'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const senhaHash = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('admins', [{
      email: 'luciana@lucianamayre.com.br',
      senha_hash: senhaHash,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('admins', { email: 'luciana@lucianamayre.com.br' });
  }
};
