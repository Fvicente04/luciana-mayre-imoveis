'use strict';

const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Erro: variável DATABASE_URL não definida.');
    console.error('Uso: DATABASE_URL="postgresql://..." node scripts/reset-senha-admin.js');
    process.exit(1);
  }

  const novaSenha = await perguntar('Nova senha: ');
  rl.close();

  if (novaSenha.length < 6) {
    console.error('Senha deve ter pelo menos 6 caracteres.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(novaSenha, 10);

  const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const result = await client.query(
    `UPDATE admins SET senha_hash = $1, updated_at = NOW() WHERE email = 'luciana@lucianamayre.com.br' RETURNING email`,
    [hash]
  );

  await client.end();

  if (result.rowCount === 0) {
    console.error('Nenhum admin encontrado com esse email.');
    process.exit(1);
  }

  console.log(`Senha atualizada com sucesso para: ${result.rows[0].email}`);
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
