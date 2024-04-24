const mariadb = require('mariadb');

const config = {
  host: '192.168.3.8',
  user: 'EasyMats',
  password: '@EasyMats',
  database: 'BD_EASYMATS',
  port: 3306,
  connectTimeout: 6000, // Aumenta el tiempo de espera a 5 segundos (5000 milisegundos)
};

async function connectToDatabase() {
  let connection;
  try {
    connection = await mariadb.createConnection(config);
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error; // Relanzamos el error para que pueda ser manejado por el código que llama a esta función
  }
  return connection;
}

async function main() {
  try {
    const connection = await connectToDatabase();
    // Aquí puedes realizar operaciones con la conexión, si se estableció correctamente
    console.log('Operaciones con la base de datos...');
    // Por ejemplo, puedes ejecutar consultas SQL aquí
    // await connection.query('SELECT * FROM tabla');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
}

main(); // Llama a la función main para iniciar la conexión



