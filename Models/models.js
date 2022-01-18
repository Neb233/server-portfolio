const db = require('../db/connection')

exports.fetchCategories = () =>{
    console.log("getting into model")
    return db.query('SELECT * FROM categories RETURNING *;')
    .then((result)=>{
return result
    })
}