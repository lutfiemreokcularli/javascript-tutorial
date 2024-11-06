const router = require('express').Router();
const User = require('../models/userModel');
const createError = require('http-errors');
const bcrypt = require("bcrypt");


router.get('/', async (req, res) => {
    const tumUserlar = await User.find({});
    res.json(tumUserlar);
})

router.get('/:id', (req, res) => {
    res.json({ mesaj: "idsi :" + req.params.id + " olan kullanıcı getirilecek" })
});

router.post('/', async (req, res, next) => {
    try {
        const ekelenecekUser = new User(req.body);
        ekelenecekUser.sifre = await bcrypt.hash(ekelenecekUser.sifre,10);
        const { err, value } = ekelenecekUser.joiValidation(req.body);
        if (!err) {
            const sonuc = await ekelenecekUser.save();
            res.json(sonuc);
        } else throw createError(err);

    } catch (error) {
        next(error);
    }
});
router.patch('/:id', async (req, res, next) => {
    delete req.body.createdAt;
    delete req.body.updatedAt;
    if(req.body.hasOwnProperty('sifre')){
        req.body.sifre = await bcrypt.hash(req.body.sifre,10);
    }

    const { error, value } = User.joiValidationForUpdates(req.body);
    if (error) {
        next(createError(error))
    } else {
        try {
            const sonuc = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true, runValidators: true

            });
            if (sonuc) {
                return res.json(sonuc);
            } else {
                //return res.status(404).json({ 'mesaj': "kullanıcı bulunamadı" });
                throw createError(404, "kullanıcı yok");
            }
        } catch (error) {
            next(error);
        }
    }


});
router.delete('/:id', async (req, res, next) => {

    try {
        const sonuc = await User.findOneAndDelete({ _id: req.params.id });
        if (sonuc) {
            return res.json(sonuc);
        } else {
            /* return res.status(404).json({
                mesaj: "user bulunamadı"
            }); */
            throw createError(404, 'kullanıcı bulunamadı')
        }
    } catch (error) {
        next(error);
    }
});


//user giriş kontrol

router.post('/giris', async(req,res,next)=>{
    try{
        const user = await User.girisYap(req.body.email,req.body.sifre);
        res.json(user);
    }catch(hata){
        next(hata);
    }
});
module.exports = router;