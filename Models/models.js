const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.fetchReview = (review_id) => {
  const formattedID = [review_id];
  return db
    .query(
      "SELECT reviews.*, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id=$1 GROUP BY reviews.review_id LIMIT 1;",
      formattedID
    )

    .then((result) => {
      const formattedResult = result.rows[0];
      if (!formattedResult) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return formattedResult;
      }
    });
};

exports.updateReview = (review_id, request) => {
  const formattedRequest = [request.inc_votes, review_id];
  if (isNaN(request.inc_votes)) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  } else {
    return db
      .query(
        "UPDATE reviews SET votes= votes+$1 WHERE reviews.review_id=$2 RETURNING *;",
        formattedRequest
      )
      .then((result) => {
        const formattedResult = result.rows[0];
        if (formattedResult === undefined) {
          return Promise.reject({ status: 404, msg: "Not found" });
        } else {
          return formattedResult;
        }
      });
  }
};
