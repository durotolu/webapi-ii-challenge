const express = require('express');
const router = require('./posts-router');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.use('/api/posts', router);

module.exports = server;