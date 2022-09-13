const express = require('express');
const cors = require('cors');
require('dotenv').config();

const displayRoutes = require('express-routemap');
const { dbConnection } = require('./db/config');

const app = express();

dbConnection();

app.use(cors());
app.use( express.static('public'));
app.set('trust proxy', true);
app.use(express.json());


app.use(`/api/${process.env.VERSION}/auth`, require('./routes/auth'));
app.use(`/api/${process.env.VERSION}/events`, require('./routes/events'));

app.listen( process.env.PORT, () => {
  console.log(`server up and runing in port ${process.env.PORT}`);
  displayRoutes(app);
})