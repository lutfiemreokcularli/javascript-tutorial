const router = require('express').Router();

const unitController = require("../controllers/unitController");


router.get('/',unitController.tumUnitleriListele);


router.post('/', unitController.yeniUnitOlustur);

module.exports = router;