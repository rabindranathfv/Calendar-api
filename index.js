const express = require('express');
const cors = require('cors');
require('dotenv').config();

const displayRoutes = require('express-routemap');
const { dbConnection } = require('./db/config');

const app = express();

dbConnection();

app.use(cors({
  allowedHeaders: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  origin: '*',
}));
app.use( express.static('public'));
app.set('trust proxy', true);
app.use(express.json());

app.use(`/api/${process.env.VERSION}/auth`, require('./routes/auth'));
app.use(`/api/${process.env.VERSION}/events`, require('./routes/events'));
app.use(`/api/${process.env.VERSION}/`, (req, res) => {

  const port = process.env.PORT;
  res.json({
    ok: true,
    msg: 'API UP AND RUNNING',
    port
  })
})

app.listen( process.env.PORT, () => {
  console.log(`server up and runing in port ${process.env.PORT}`);
  displayRoutes(app);
})