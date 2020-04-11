const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const routes = require('./src/routes');
const db = require('./src/db');

const app = express()
  .set('db', db)
  .use(cors())
  .use(bodyParser.json());

routes.forEach((route) => route(app));

/* eslint-disable no-process-env */
const PORT = process.env.PORT || 3000;

/* eslint-disable no-console */
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
