const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const api = require('./api');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api', api);

module.exports = server;
