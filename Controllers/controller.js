const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const {
  fetchCategories,
  fetchReview,
  updateReview,
  fetchReviews,
  fetchComments,
  makeComment,
  removeComment,
} = require("../Models/models");
const {
  checkReviewExists,
  checkUserExists,
} = require("../Utilities/utilities");

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
  return checkReviewExists(req.params.review_id)
    .then((reviewExists) => {
      if (reviewExists) {
        return fetchComments(req.params.review_id).then((comments) => {
          res.status(200).send({ comments });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Review not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.postComment = (req, res, next) => {
  const review_id = req.params.review_id;
  const Username = req.body.username;
  const Body = req.body.body;
  //Following code runs the request through two utility functions, one to check that the user posting the comment exists, and if it passes that, the next function checks that the review being commented on exists
  return checkUserExists(req.body.username)
    .then((userExists) => {
      if (userExists) {
        return checkReviewExists(req.params.review_id).then((reviewExists) => {
          if (reviewExists) {
            return makeComment(review_id, Username, Body).then((comment) => {
              res.status(201).send({ comment });
            });
          } else {
            return Promise.reject({ status: 404, msg: "Review not found" });
          }
        });
      } else {
        return Promise.reject({ status: 404, msg: "User not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteComment = (req, res, next) => {
  removeComment(req.params)
    .then((response) => {
      console.log(response);
      res.status(204).send(response);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
