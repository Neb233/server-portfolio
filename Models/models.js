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
    return Promise.reject({ status: 400, msg: "Bad request" });
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
exports.fetchReviews = (sort_by = "created_at", order = "DESC", category) => {
  const validKeys = [
    "ASC",
    "DESC",
    "asc",
    "desc",
    "owner",
    "title",
    "review_id",
    "category",
    "review_img_url",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!validKeys.includes(sort_by) || !validKeys.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const valuesArray = [];

  let sqlQuery =
    "SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id=reviews.review_id GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes";

  if (category) {
    sqlQuery += " WHERE category =$1";
    valuesArray.push(category);
  }

  sqlQuery += ` ORDER BY reviews.${sort_by} ${order};`;

  return db.query(sqlQuery, valuesArray).then(({ rows }) => {
    return rows;
  });
};
exports.fetchComments = (review_id) => {
  const formattedID = [review_id];
  return db
    .query(
      "SELECT comments.* FROM comments WHERE comments.review_id=$1 GROUP BY comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body;",
      formattedID
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.makeComment = (review_id, Username, Body) => {
  const formattedPost = [review_id, Username, Body];
  if (!Username || !Body) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else {
    return db
      .query(
        "INSERT INTO comments(review_id, author, body) VALUES ($1, $2, $3) RETURNING *",
        formattedPost
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
};
exports.removeComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id=$1", [comment_id.comment_id])
    .then((response) => {
      return response.rows;
    });
};
exports.fetchAPIS = () => {
  console.log("getting into model");
  return db.query("SELECT * FROM sys.endpoints").then((response) => {
    console.log(response.rows);
    return response.rows;
  });
};
