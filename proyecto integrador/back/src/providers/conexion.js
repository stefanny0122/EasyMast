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
    console.log('Conectando a la base de datos...');
    connection = await mariadb.createConnection(config);
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Relanzamos el error para que pueda ser manejado por el código que llama a esta función
  }
  return connection;
}

async function main() {
  try {
    const connection = await connectToDatabase();
    console.log('Operaciones con la base de datos...');
    // Aquí puedes realizar operaciones con la conexión, si se estableció correctamente
    // Por ejemplo, puedes ejecutar consultas SQL aquí
    // await connection.query('SELECT * FROM tabla');
    await connection.end(); // No olvides cerrar la conexión cuando hayas terminado
  } catch (error) {
    console.error('Error en la función principal:', error);
  }
}

main(); // Llama a la función main para iniciar la conexión



