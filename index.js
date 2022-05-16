require ('dotenv').config()
const http = require ('http')
const cors = require ('cors')
const morgan = require ('morgan');
const express = require ('express');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser')

const app = express ();
const authRouter = require ('./router/index')

express.json ()
app.use (cors({origin: [`http://localhost:3000`, `https://localhost:5000`], credentials: true,}))
app.use (cookieParser());
app.use (express.json());
app.use (express.urlencoded ({extended: true}));
app.use ('/auth', authRouter);

morgan (':method :url :status :res[content-length] - :response-time ms');
app.listen(process.env.port || 5000, (error) => error ? console.log (error) : logStatus ('Port'));
mongoose.connect (process.env.dblink, (error) => error ? console.log (error) : logStatus ('DB'));
function logStatus (connect) {console.log (`${connect} is Active-Connect`)};
