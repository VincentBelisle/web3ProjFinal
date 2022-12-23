var express = require('express');
var path = require('path');
var swaggerUi = require('swagger-ui-express')
var swaggerFile = require('./swagger_output.json')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 


var vehiculesRouter = require('./routes/vehicules');
var statistiquesRouter = require('./routes/statistiques');
var utilisateursRouter = require('./routes/utilisateurs');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/vehicules', vehiculesRouter);
app.use('/statistiques', statistiquesRouter);
app.use('/utilisateurs', utilisateursRouter);

// Swagger sur la page d'accueil
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use(express.static(path.join(__dirname, 'public')));


require('dotenv').config();



module.exports = app;
