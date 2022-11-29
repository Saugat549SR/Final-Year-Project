
const mongoose=require('mongoose');
require('dotenv').config()

var MongoClient = require('mongodb').MongoClient

module.exports=async()=>{
    
    try{
        await  MongoClient.connect(process.env.mongo_url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
          console.log("connected successfully")

    }catch(error){
        console.log(error.message);

    }
}
