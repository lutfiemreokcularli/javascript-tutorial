const express = require('express');
require('./db/dbConnection');
const hataMiddleware = require('./middleware/hataMiddleware');
const jwt = require("jsonwebtoken");

//Routes
const userRouter = require('./router/userRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRouter);


app.get('/',(req,res) =>{
    res.status(200).json({'mesaj' : 'hoşgeldiniz'})
});

app.use(hataMiddleware);

/*  const test = async() => {
    const sifre = "emre";
    const hashedSifre = await bcrypt.hash(sifre,10);
    console.log(sifre,hashedSifre);

    const sonuc = await bcrypt.compare(sifre,hashedSifre);
    console.log(sonuc)
}
test(); */
function test(){
    const token = jwt.sign({_userID: 'yenikull',isAdmin: true,aktif: true},'123456',{expiresIn:'2h'});
    console.log(token)

    const sonuc = jwt.verify(token,'123456');
    console.log(sonuc)
}
test();

app.listen(3000, () => {
    console.log("3000 portu dinleniyor");
})








/* app.get('/:id',(req,res) =>{
    console.log(req.query);
    res.status(200).json({'id' : req.params.id});
});

app.post('/',(req,res) =>{
    res.status(200).json(req.body);
}); */