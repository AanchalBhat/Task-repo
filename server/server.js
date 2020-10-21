const express = require("express");
const http = require("http");
const app = require("./app");
const ENV = require("./config/env");


const server = http.createServer(app);

server.listen(ENV.PORT , () => {
    console.log(`Server is running at port : ${ENV.PORT}`);

});
