'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('depoimentos', [
      {
        nome_cliente: 'Fernanda Oliveira',
        texto: 'A Luciana foi incrível durante todo o processo. Encontrou o apartamento perfeito para a nossa família em menos de um mês. Atendimento humano e sem pressão.',
        nota: 5,
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_cliente: 'Ricardo Matos',
        texto: 'Profissional exemplar. Além de encontrar o imóvel ideal, ela me orientou em cada etapa da documentação. Recomendo sem hesitar.',
        nota: 5,
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_cliente: 'Ana Paula Souza',
        texto: 'Comprei meu primeiro apartamento com a Luciana. Ela teve uma paciência enorme com todas as minhas dúvidas e sempre foi honesta sobre os imóveis.',
        nota: 5,
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_cliente: 'Carlos Eduardo Lima',
        texto: 'Alugamos nossa casa por intermédio da Luciana. Processo rápido, transparente e sem burocracia desnecessária. Com certeza voltaremos a trabalhar com ela.',
        nota: 5,
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('depoimentos', null, {});
  }
};
