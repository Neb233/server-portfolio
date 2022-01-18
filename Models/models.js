const db = require('../db/connection')

exports.fetchCategories = () =>{
    return db.query('SELECT * FROM categories;')
    .then((result)=>{
return result.rows
    })
}

exports.fetchReview = (request) =>{
    const formattedRequest = [request]
    console.log(formattedRequest)
return db.query('SELECT * FROM comments WHERE review_id=$1;', formattedRequest)
.then((comments) => {
    console.log(comments.rows)
})
}