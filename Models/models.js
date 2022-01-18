const db = require('../db/connection')

exports.fetchCategories = () =>{
    return db.query('SELECT * FROM categories;')
    .then((result)=>{
return result.rows
    })
}

exports.fetchReview = (request) =>{
    const formattedRequest = [request]
return db.query('SELECT reviews.*, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id=$1 GROUP BY reviews.review_id LIMIT 1;', formattedRequest)

.then((result) => {
    const formattedResult = result.rows[0]
    
    return formattedResult
})

}