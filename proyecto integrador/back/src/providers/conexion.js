const mariadb = require('mariadb');

const config = {
  host: '127.0.0.1',
  user: 'root',
  password: '12345',
  database: 'bd_easymats', // Reemplaza 'bd_easymats' con el nombre real de tu base de datos
  port: 3306, // Cambiado el puerto a 3306 nuevamente
  connectTimeout: 6000, // Aumenta el tiempo de espera a 6 segundos (6000 milisegundos)
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
    console.log('SELECT*FROM estado_cuenta;');
    // Aquí puedes realizar operaciones con la conexión, si se estableció correctamente
    // Por ejemplo, puedes ejecutar consultas SQL aquí
    // await connection.query('SELECT * FROM tabla');
    await connection.end(); // No olvides cerrar la conexión cuando hayas terminado
  } catch (error) {
    console.error('Error en la función principal:', error);
  }
}

main(); // Llama a la función main para iniciar la conexión
