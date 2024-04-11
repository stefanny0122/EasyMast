const sql = require('mssql');

const config = {
  server: 'DESKTOP-T0UMF1I\\SQLEXPRESS',
  database: 'BD_EASYMATS',
  options: {
    trustedConnection: true // Habilita la autenticación de Windows
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
}

module.exports = {
  connectToDatabase
};
