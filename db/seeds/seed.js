
const db = require('../connection');
const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables

      return db.query('DROP TABLE IF EXISTS comments')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS reviews')
      })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS users')
        })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS categories')
          })
    .then(() => {
      console.log("tables have dropped");
      return db.query(`
      CREATE TABLE categories (
        slug VARCHAR(255) PRIMARY KEY UNIQUE,
        description VARCHAR(255) NOT NULL
      );` );
      
      
    })
    .then(() => {
      console.log("categories table created")
      return db.query(`
      CREATE TABLE users (
        username VARCHAR(255) PRIMARY KEY UNIQUE,
        avatar_url TEXT NOT NULL,
        name VARCHAR(255) NOT NULL
      )`);
    })
    .then(() => {
      console.log("users table created")
      return db.query(`
      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR(255) NOT NULL,
        review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category TEXT REFERENCES categories(slug),
        owner TEXT REFERENCES users(username),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`)
    })
    .then(() => {
      console.log("reviews table created")
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(255) REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        VOTES INT DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        body TEXT NOT NULL
      )`)
    })
  // 2. insert data
};


module.exports = seed;
