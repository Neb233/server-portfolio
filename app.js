const express = require('express')
const app = express();
const { getCategories, getReview }= require('./Controllers/controller')
app.use(express.json());
const { handleCustomErrors, handleServerErrors, handlePsqlErrors, handle404s } = require('./Errors/Index')


app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)

app.all('*', handle404s);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);


module.exports = app

