const mysql = require('mysql');

const config = {
  host: '192.168.3.8',
  user: 'admin12',
  password: '123',
  database: 'BD_EASYMATS', // Reemplaza 'BD_EASYMATS' con el nombre real de tu base de datos
  port: 3306,
  connectTimeout: 6000, // Aumenta el tiempo de espera a 6 segundos (6000 milisegundos)
};

async function connectToDatabase() {
  try {
    console.log('Conectando a la base de datos...');
    const connection = mysql.createConnection(config);
    connection.connect();
    console.log('Conexión establecida correctamente.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Relanzamos el error para que pueda ser manejado por el código que llama a esta función
  }
}

async function main() {
  try {
    const connection = await connectToDatabase();
    console.log('Insertando registro de estado de cuenta como "Activo"...');
    connection.query('INSERT INTO ESTADO_CUENTA (ID_ESTADO, TIPO_ESTADO) VALUES (1, "Activo")', (error, results, fields) => {
      if (error) throw error;
      console.log('Registro insertado correctamente.');
      connection.end(); // Cerramos la conexión cuando hayamos terminado
    });
  } catch (error) {
    console.error('Error en la función principal:', error);
  }
}

main(); // Llama a la función main para iniciar la conexión
