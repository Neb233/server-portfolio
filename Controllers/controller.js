const req = require('express/lib/request');
const res = require('express/lib/response');
const { fetchCategories }= require('../Models/models')

exports.getCategories = (req,res,next)=>{
    console.log("getting into the controller")
fetchCategories().then((categories)=>{
    console.log(categories)
    res.status(200).send({ categories })
}).catch((err)=>{
    console.log(err,"errrrrrrrrrrrrrrrrrrrr");
    res.status(500).send({msg:"Internal Server Error"})
})

}