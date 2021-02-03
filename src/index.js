const logger = require('./utils/logger');
const app = require('./app/server');

app.listen(app.get('port'), () => 
    logger.info(`Server on port ${app.get('port')}`)
)