'use strict';

const express = require('express');

const app = express();

// const cors = require('cors')

const Model = require('../Model')
const logger = require('./logger')

app.use(express.json());

app.use(logger);

app.use(timeStamp)
function errorHandler(err,req,res,next){
    res.status(500);
    res.statusMessage = 'server down';
    res.json({error:err});
}

function noHandler(req,res,next){
    res.status(404);
    res.statusMessage = 'Not Found';
    res.json({error:'Not Found'});
}

function timeStamp(req, res , next){
  let newTime = new Date();
  let requestTime = newTime.toString();
  req.requestTime = requestTime ;
  next();
}

// function timestamp(){
//     return (req,res,next)=>{
//         req.time = new Date().toDateString()
//         console.log('time',new Date().toDateString())
//     }
// }

// function logger(){
//     return (req,res,next)=>{
//         console.log(req.method);
//         console.log(req.path);
//     }
// }
let product_db = new Model()

let categories = new Model()

app.get('/timeStampe',timeStamp)

app.post('/products',(req,res,next)=>{
  product_db.create({
    name : req.body.name,
    seconed_name : req.body.seconed_name
  }).then(data=>{
    res.status(201).json(data)
  })
})
app.post('/category',(req,res)=>{
  categories.create({
    name : req.body.name,
    seconed_name : req.body.seconed_name
  }).then(output =>{
    res.status(201).json(output)
  })
})


app.get('/products/:id',(req,res)=>{
  let output =product_db.get(req.params.id)
  res.json(output)
})

app.get('/category/:id',(req,res)=>{
  let output = categories.get(req.params.id)
    res.json(output)
})
app.put('/category/:id',(req,res)=>{
  console.log(req.body)
  categories.update(req.params.id,req.body)
  .then(output =>{
    res.status(200).json(output)
  })
})
app.put('/products/:id',(req,res)=>{
  console.log(req.body)
  product_db.update(req.params.id,req.body)
  .then(output =>{
    res.status(200).json(output)
  })
})
app.delete('/category/:id',(req,res)=>{
  categories.delete(req.params.id)
  .then(output =>{
    res.send('requetsis delete')
  })
})
app.delete('/products/:id',(req,res)=>{
  product_db.delete(req.params.id)
  .then(output =>{
    res.send('request is delete')
  })
})


app.get('*',noHandler)

// app.get('/categories',(req,res)=>{
//     let output = {
//         name : req.query.name
//     }
// })

// app.post('')

module.exports = {
    server : app,
    start:port=>{
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT,()=>{
            console.log(`listening to the ${PORT}`);
        })
    }
}