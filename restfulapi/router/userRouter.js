const router = require('express').Router();
const User = require('../models/userModel');
var createError = require('http-errors')


router.get('/', async (req, res) => {
    const tumUserlar = await User.find({});
    res.json(tumUserlar);
})

router.get('/:id', (req, res) => {
    res.json({ mesaj: "idsi :" + req.params.id + " olan kullanıcı getirilecek" })
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const ekelenecekUser = new User(req.body);
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
    delete req.body.sifre;

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

module.exports = router;