const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const blogRouter = require('./src/routers/blogRouter');
const unitRouter = require('./src/routers/unitRouter');
const pageRouter = require('./src/routers/pageRouter');

app.use(express.static('public'));
app.use(expressLayout);
app.set('view engine','ejs');
app.set('views', path.resolve(__dirname,'./src/views'));

app.use(express.urlencoded({extended: true}));

app.use('/',pageRouter);
app.use('/blog',pageRouter);

app.listen(4000,()=>{
    console.log("4000 den ayaklandık");
})