const User = require('../models/userModel');
const createError = require('http-errors');
const bcrypt = require("bcrypt");

const tumUserlariListele =  async (req, res) => {
    const tumUserlar = await User.find({});
    res.json(tumUserlar);
};
const oturumAcanKullaniciBilgileri = (req, res) => {
    res.json(req.user);
}
const oturumAcanKullaniciGüncelleme = async (req, res) => {
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
            const sonuc = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
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
};

const yeniKullaniciOlustur = async (req, res, next) => {
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
};

const adminUserGuncelleme = async (req, res, next) => {
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


}
const girisYap = async(req,res,next)=>{
    try{
        const user = await User.girisYap(req.body.email,req.body.sifre);
        const token = await user.generateToken();
        res.json({
            user,token
        });
    }catch(hata){
        next(hata);
    }
};
const tumKullanicilariSil = async (req, res, next) => {

    try {
        const sonuc = await User.deleteMany({isAdmin: false});
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
};
const kullaniciKendiniSil = async (req, res, next) => {

    try {
        const sonuc = await User.findOneAndDelete({ _id: req.user.id });
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
};
const adminKullaniciSil = async (req, res, next) => {

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
};
module.exports ={
    tumUserlariListele,
    oturumAcanKullaniciBilgileri,
    oturumAcanKullaniciGüncelleme,
    yeniKullaniciOlustur,
    girisYap,
    adminUserGuncelleme,
    tumKullanicilariSil,
    kullaniciKendiniSil,
    adminKullaniciSil
}