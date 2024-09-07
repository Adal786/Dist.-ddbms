const { Sequelize } = require('sequelize');
const { MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = require('./config');

const sequelize = new Sequelize('abcd', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    logging: false, // Disable logging; set to true to see SQL queries in console
});

sequelize.authenticate()
    .then(() => console.log('MySQL connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the MySQL database:', err));

module.exports = sequelize;
