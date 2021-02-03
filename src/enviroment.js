if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

const env = {
    PORT : process.env.PORT,
};

module.exports = env;