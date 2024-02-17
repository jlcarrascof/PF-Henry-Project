const express = require("express");
const mainRouter = require("./routes/mainRouter");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(mainRouter);

module.exports = server;
