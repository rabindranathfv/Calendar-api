const express = require('express');
require('dotenv').config();

const displayRoutes = require('express-routemap');
const { dbConnection } = require('./db/config');

const app = express();

dbConnection();

app.use( express.static('public'));
app.set('trust proxy', true);
app.use(express.json());


app.use(`/api/${process.env.VERSION}/auth`, require('./routes/auth'));

app.listen( process.env.PORT, () => {
  console.log(`server up and runing in port ${process.env.PORT}`);
  displayRoutes(app);
})