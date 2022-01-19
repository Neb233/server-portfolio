const express = require('express')
const app = express();
const { getCategories, getReview }= require('./Controllers/controller')
app.use(express.json());
const { handleCustomErrors, handleServerErrors, handlePsqlErrors, handle404s } = require('./Errors/Index')


app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)

app.call('*', handle404s);

app.use(handleCustomErrors);
app.use(handleServerErrors);
app.use(handlePsqlErrors);

module.exports = app

