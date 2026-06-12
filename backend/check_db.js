const { Client } = require('c:/Users/DELL/Documents/unah_conecta_proyecto/unah_conecta-main/backend/node_modules/pg');

const client = new Client({
  connectionString: 'postgresql://unahcu:Tt6khZa6eLgcAarLqJXBU13h0V66eYum@dpg-d8f4rregvqtc738td3og-a.virginia-postgres.render.com/puma_conecta?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected!');
    
    // Check column defaults for usuario and ficha_estudiante
    const res = await client.query(`
      SELECT table_name, column_name, column_default, is_identity
      FROM information_schema.columns
      WHERE table_name IN ('usuario', 'ficha_estudiante') AND column_name IN ('id_usuario', 'id_ficha');
    `);
    console.log('Defaults:', res.rows);

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
