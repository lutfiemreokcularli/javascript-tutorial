const Page = require('../models/pageModel');


const tumSayfalariListele = async (req, res) => {
    const tumSayfalar = await Page.find({});
    res.json(tumSayfalar);
};

const yeniSayfaOlustur = async (req, res, next) => {
    try {
        const eklenecekSayfa = new Page(req.body);
        const sonuc = await eklenecekSayfa.save();
        res.json(sonuc);

    } catch (error) {
        next(error);
    }
};

const tekSayfaGetir = async (req, res,next) => {
    try {
        const sonuc = await Page.find({ _id: req.params.id })
        if (sonuc) {
            return res.json(sonuc);
        } else {
            throw createError(404, "ilgili sayfa yok");
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {
    tumSayfalariListele,
    yeniSayfaOlustur,
    tekSayfaGetir
}