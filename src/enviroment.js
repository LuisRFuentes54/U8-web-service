if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

const env = {
    PORT : process.env.PORT,
    DBMS: process.env.DBMS,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
};

module.exports = env;