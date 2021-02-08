const express = require('express');
const morgan = require('morgan');
const logger = require('../utils/logger')
const routerAPIv1 = require('../routes/api-v1.routes');
const config = require('../enviroment');

 
// SETTINGS
const app = express();
app.set('port', config.PORT || 3000);


// MIDDLEWARES
app.use(morgan("dev", { "stream": logger.stream }));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
    res.json("The web service is working");
});


app.use('/api/v1', routerAPIv1);

// ERROR HANDLER
app.use(function(err, req, res, next) {
    logger.error(err.message);
    res.status(500).send({ error: "SERVER_ERROR", message: err.message });
});

module.exports = app;