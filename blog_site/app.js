const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const blogRouter = require('./src/routers/blogRouter');

app.use(express.static('public'));
app.use(expressLayout);
app.set('view engine','ejs');
app.set('views', path.resolve(__dirname,'./src/views'));

app.use(express.urlencoded({extended: true}));

app.use('/',blogRouter);
app.use('/blog',blogRouter);

app.listen(3000,()=>{
    console.log("3000 den ayaklandık");
})