const express = require("express");
const app = express();
const path = require("path");

const ejs = require('ejs');
const expressLayouts = require("express-ejs-layouts");

app.set('view engine','ejs');

app.use(expressLayouts)
app.get('/',(req,res)=>{
    
    partsArray = [
        {image : 'https://cdn.minticity.com/assets/mintibuch/starter/wer-bist-du/seite-1/junior/box1.png'},
        {image : 'https://cdn.minticity.com/assets/mintibuch/starter/das-deutsche-abc/seite-1/junior/1.png'}
    ]
    mechanicsArray = [
        {key : 'nthaudioinputkontrolle', count: 3},
    ]

    res.render("index",{
        gameWidth: 1813,
        gameHeight: 884,
        backgroundColor: '#0023ff',
        parts : partsArray,
        mechanics : mechanicsArray
    });
})
app.listen(3000, () => {
    
});