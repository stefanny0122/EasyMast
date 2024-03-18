const { createPool } = require('mariadb');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Socrates#1',
  database: 'easymatsdb',
  port: 3307
});
module.exports = pool;