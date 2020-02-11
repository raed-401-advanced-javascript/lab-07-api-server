'use strict';


module.exports = (req,res,next)=>{
    let time_output = new Date().toDateString()
    console.log('time',time_output);
    req.timeStamp = time_output  
    console.log(req.method);
    console.log(req.path);
    next()
}