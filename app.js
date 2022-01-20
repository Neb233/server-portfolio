const express = require("express");
const app = express();
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

app.all("*", handle404s);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
