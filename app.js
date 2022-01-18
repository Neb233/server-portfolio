const express = require('express')
const app = express();
const { getCategories, getReview }= require('./Controllers/controller')
app.use(express.json());


app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)

module.exports = app

