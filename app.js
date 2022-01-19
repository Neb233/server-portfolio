const express = require("express");
const app = express();
const {
  getCategories,
  getReview,
  patchReview,
} = require("./Controllers/controller");
app.use(express.json());
const {
  handleCustomErrors,
  handleServerErrors,
  handlePsqlErrors,
  handle404s,
} = require("./Errors/Index");

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);
app.patch("/api/reviews/:review_id", patchReview);

app.all("*", handle404s);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
