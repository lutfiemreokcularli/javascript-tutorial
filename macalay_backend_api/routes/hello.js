const helloRoute = require('express').Router();

helloRoute.get('/hello',(req,res)=>{
    res.send('hello world');
})

module.exports = helloRoute;