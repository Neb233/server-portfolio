const express = require('express')
const app = express();
const { getCategories }= require('./Controllers/controller')
app.arguments(express.json());


app.get('/api/categories', getCategories)

module.exports = app

