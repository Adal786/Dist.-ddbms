const { Sequelize } = require('sequelize');
const { MYSQL_USER, MYSQL_PASSWORD } = require('./config');

const dbConfigs = [
    { host: 'db1', port: 3306 }, //0
    { host: 'db2', port: 3306 }, //1
    { host: 'db3', port: 3306 }//2
];

let counter = 0;

function getDbConfig() {
    const config = dbConfigs[counter];
    counter = (counter + 1) % 3;
    return config;
}

const sequelize = new Sequelize('abcd', MYSQL_USER, MYSQL_PASSWORD, {
    host: getDbConfig().host,
    dialect: 'mysql',
    port: getDbConfig().port,
    logging: false, // Disable logging; set to true to see SQL queries in console
});

sequelize.authenticate()
    .then(() => console.log(`MySQL connection to ${sequelize.config.host}:${sequelize.config.port} has been established successfully.`))
    .catch(err => console.error('Unable to connect to the MySQL database:', err));

module.exports = sequelize;
