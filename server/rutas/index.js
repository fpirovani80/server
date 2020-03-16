const express = require('express')
const app = express()
const router = express.Router();


app.use(require('./login'));
app.use(require('./usuarios'));

module.exports = app;