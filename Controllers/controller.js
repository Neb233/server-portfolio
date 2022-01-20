const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const {
  fetchCategories,
  fetchReview,
  updateReview,
  fetchReviews,
  fetchComments,
} = require("../Models/models");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReview = (req, res, next) => {
  fetchReview(req.params.review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReview = (req, res, next) => {
  updateReview(req.params.review_id, req.body)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getReviews = (req, res, next) => {
  const order = req.query.order;
  const sort_by = req.query.sort_by;
  fetchReviews(sort_by, order)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getComments = (req, res, next) => {
  fetchComments(req.params.review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
