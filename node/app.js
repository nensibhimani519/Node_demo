const http = require('http')
const express = require('express')
const routes = require('./routes')
const adminRoutes = require('./routes/admin')



const server = http.createServer(routes.handler)

console.log(routes.someText,'some text');

server.listen(3000)