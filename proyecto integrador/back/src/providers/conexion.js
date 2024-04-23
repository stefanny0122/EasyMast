const mariadb = require('mariadb');

const config = {
  host: 'nombre_del_servidor',
  user: 'nombre_de_usuario',
  password: 'contraseña',
  database: 'nombre_de_la_base_de_datos'
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
