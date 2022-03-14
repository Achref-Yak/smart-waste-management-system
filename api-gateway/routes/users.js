var express = require('express');
const httpProxy = require('express-http-proxy');
var app = express.Router();

const authServiceProxy = httpProxy('http://localhost:4112')

// Proxy request
app.get('/api/v1/users', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.get('/api/v1/users/logout', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.get('/api/v1/users/me', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.post('/api/v1/users/auth/email', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.post('/api/v1/users/signup', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.post('/api/v1/users/forgotPassword', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.patch('/api/v1/users/resetPassword/:token', (req, res, next) => {
  authServiceProxy(req, res, next)
})
app.patch('/api/v1/users/updateMyPassword', (req, res, next) => {
  authServiceProxy(req, res, next)
})

module.exports = app;
