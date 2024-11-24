const express = require('express');
require('./db/dbConnection');
const hataMiddleware = require('./middleware/hataMiddleware');

const userRouter = require('./router/userRouter');
const unitRouter = require('./router/unitRouter');
const pageRouter = require('./router/pageRouter');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRouter);
app.use('/api/units',unitRouter);
app.use('/api/pages',pageRouter);


app.get('/',(req,res) =>{
    res.status(200).json({'mesaj' : 'hoşgeldiniz'})
});

app.use(hataMiddleware);

app.listen(3000, () => {
    console.log("3000 portu dinleniyor");
})