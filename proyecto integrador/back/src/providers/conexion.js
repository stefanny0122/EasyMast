const mariadb = require('mariadb');

const config = {
  host: '192.168.3.8',
  user: 'root',
  password: '12345',
  database: 'BD_EASYMATS',
  port:'3306'
};

// Función para conectar a la base de datos
async function connectToDatabase() {
  let connection;
  try {
    connection = await mariadb.createConnection(config);
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
  return connection;
}

module.exports = {
  connectToDatabase
};
