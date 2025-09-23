const express = require('express');
const { createServer } = require('http');
const expressRoutes = require('./http/routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(expressRoutes);

const server = createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Servidor is running: http://localhost:${PORT}`);
});