
//require ('dotenv').config({path:'./env'})
import  dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})




connectDB()  // from db/index.js
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    });
})
.catch((err)=>{
    console.log("mongo db connectiion failed!!!", err)
})











/*
approach one
import express from 'express';
const app=express()

(async()=>{

    try{

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',(error)=>{
            console.log('ERROR: ',error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listing on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error('ERROR: ',error)
        throw err

    }
})()
    */

//approach two
