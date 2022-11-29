var express = require('express');
var path = require('path');
var swaggerUi = require('swagger-ui-express')
var swaggerFile = require('./swagger_output.json')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var vehiculesRouter = require('./routes/vehicules');
var statistiquesRouter = require('./routes/statistiques');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/vehicules', vehiculesRouter);
app.use('/statistiques', statistiquesRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


module.exports = app;
