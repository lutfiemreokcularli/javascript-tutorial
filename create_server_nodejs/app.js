const express = require('express');
const joi = require("joi");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
const kullanicilar = [
    {id:1,ad:"emre",yas:32},
    {id:2,ad:"hasan",yas:32},
    {id:3,ad:"mert",yas:32},
    {id:4,ad:"ali",yas:32},
];
app.get("/",(req,res)=>{
    console.log("Ana sayfaya girildi")
    res.send("<h1>anasayfadassın</h1>");
})
app.get("/users",(req,res)=>{
    if(req.query.ters){
        res.send(kullanicilar.reverse());
    }else{
        res.send(kullanicilar);
    }
})
app.get("/users/:id",(req,res)=>{
    const bulunanUser = kullanicilar.find(user => user.id === parseInt(req.params.id));
    bulunanUser ? res.send(bulunanUser) : res.status(404).send("böyle bir kuullanıcı yok kardeşim");
})

app.post("/users",(req,res)=>{
    const schema = joi.object({
        isim: joi.string().min(3).max(30).required(),
        yas: joi.number().integer().min(10).max(150).required()
    });
    const sonuc = schema.validate(req.body);

    if(sonuc.error){
        res.status(400).send(sonuc.error.details[0].message);
    }else{
        const yeniKullanici = {
            id: kullanicilar.length + 1,
            ad: req.body.isim,
            yas: req.body.yas
        }
        kullanicilar.push(yeniKullanici);
        res.send(yeniKullanici);
    }

    
});
app.put("/users/:id",(req,res)=>{
    const bulunanUser = kullanicilar.find(user => user.id === parseInt(req.params.id));
    if(!bulunanUser) return res.status(400).send("kullanıcı bulunamadı");

    const {error} = kullaniciBilgileriniOnayla(req.body)

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        bulunanUser.ad = req.body.isim;
        bulunanUser.yas = req.body.yas;
        res.send(bulunanUser);
    }

    
});
app.delete('/users/:id',(req,res)=>{
    const bulunanUser = kullanicilar.find(user => user.id === parseInt(req.params.id));
    if(bulunanUser){
        const index = kullanicilar.indexOf(bulunanUser);
        kullanicilar.splice(index,1);
        res.send(bulunanUser);
    }else{
        res.status(404).send(req.params.id + ' idli kullanıcı bulunamadı');
    }
})
function kullaniciBilgileriniOnayla(user){
    const schema = joi.object({
        isim: joi.string().min(3).max(30).required(),
        yas: joi.number().integer().min(10).max(150).required()
    });
    
    return schema.validate(user);
}
app.listen(3000,() =>{
console.log("server 3000 portunu dinliyor...")
})
