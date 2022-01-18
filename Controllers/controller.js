const req = require('express/lib/request');
const res = require('express/lib/response');
const { fetchCategories, fetchReview }= require('../Models/models')

exports.getCategories = (req,res,next)=>{
fetchCategories().then((categories)=>{
    res.status(200).send({ categories })
}).catch((err)=>{
    console.log(err,"errrrrrrrrrrrrrrrrrrrr");
    res.status(500).send({msg:"Internal Server Error"})
})

}

exports.getReview = (req,res,next)=>{
    fetchReview(req.params.review_id).then((review)=> {
        res.status(200).send({ review })
    })
}