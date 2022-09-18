const createError 	  = require('http-errors');
const express 		  = require('express');
const bodyParser      = require('body-parser');
const path 	          = require('path');
const logger 		  = require('morgan');
const cookieParser 	  = require('cookie-parser');
const session         = require('express-session');
const app             = express();
const reply             = require('./server/helpers/response')
const moment            = require('moment')
const cors = require('cors');

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())

const indexRouter     = require('./server/api/index');
const authRouter      = require('./server/api/auth');

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);

app.use((err, res)=> {
    if(err){
        res.send({status:404, message:"REQUEST_NOT_FOUND"})
    }
});

   
module.exports = app;