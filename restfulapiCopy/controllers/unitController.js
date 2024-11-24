const Unit = require('../models/unitModel');


const tumUnitleriListele = async (req, res) => {
    const tumUnitler = await Unit.find({});
    res.json(tumUnitler);
};

const yeniUnitOlustur = async (req, res, next) => {
    try {
        const eklenecekUnit = new Unit(req.body);
        const sonuc = await eklenecekUnit.save();
        res.json(sonuc);

    } catch (error) {
        next(error);
    }
};
module.exports = {
    tumUnitleriListele,
    yeniUnitOlustur
}