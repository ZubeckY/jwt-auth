require ('dotenv').config()
const cors = require ('cors')
const morgan = require ('morgan');
const express = require ('express');
const mongoose = require ('mongoose');

const app = express ();
const authRouter = ('')

express.json ()
app.use(cors())
app.use ('/auth', authRouter);


morgan (':method :url :status :res[content-length] - :response-time ms');
app.listen(process.env.port || 5000, (error) => error ? console.log (error) : logStatus ('Port'));
mongoose.connect (process.env.dblink, (error) => error ? console.log (error) : logStatus ('DB'));
function logStatus (connect) {console.log (`${connect} is Active-Connect`)};

