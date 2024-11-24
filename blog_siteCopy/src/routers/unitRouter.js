const router = require('express').Router();
const unitController = require('../controllers/unitController');


router.get('/',unitController.tumUnitleriGetir);

module.exports = router;