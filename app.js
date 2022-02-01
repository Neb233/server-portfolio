const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require("fs");
const endpoints = require("./endpoints.json");
const {
  getCategories,
  getReview,
  patchReview,
  getReviews,
  getComments,
  postComment,
  deleteComment,
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
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id/comments", getComments);
app.post("/api/reviews/:review_id/comments", postComment);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.all("*", handle404s);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
