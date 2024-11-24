const router = require('express').Router();

const pageController = require("../controllers/pageController");


router.get('/',pageController.tumSayfalariListele);
router.get('/:id',pageController.tekSayfaGetir);


router.post('/', pageController.yeniSayfaOlustur);

module.exports = router;