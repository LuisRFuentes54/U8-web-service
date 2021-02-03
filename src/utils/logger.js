const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf(info => `[${info.timestamp}] - ${info.level} - ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug',
        })
    ]
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message.slice(0, -1));
    },
};

module.exports = logger;