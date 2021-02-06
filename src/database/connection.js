const orm = require("sequelize");
const config = require("../enviroment");

const connection = new orm.Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        dialect: config.DBMS,
        port: config.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000,
        },
        logging: false
    }
);

module.exports = connection;