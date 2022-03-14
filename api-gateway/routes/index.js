var express = require('express');
const httpProxy = require('express-http-proxy');
var app = express.Router();

const authServiceProxy = httpProxy('http://localhost:4112/api/v1/users')

// Proxy request
app.get('/auth/email', (req, res, next) => {
  authServiceProxy(req, res, next)
})

module.exports = app;
