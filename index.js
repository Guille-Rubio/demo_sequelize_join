const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
require('./schemas/associations');
require('./config/sqlConnection');
const autoresRouter = require('./routes/autoresRoutes');
const entradasRouter = require('./routes/entradasRoutes');

app.use(express.json());

app.use("/autores", autoresRouter);
app.use("/entradas", entradasRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
