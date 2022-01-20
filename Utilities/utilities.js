const db = require("../db/connection");

exports.checkReviewExists = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id=$1", [review_id])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkUserExists = (Username) => {
  return db
    .query("SELECT * From users WHERE username=$1", [Username])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};
