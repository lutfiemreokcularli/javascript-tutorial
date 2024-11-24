const router = require('express').Router();
const pageController = require('../controllers/pageController');


router.get('/',pageController.tumPageleriGetir);
router.get('/:id',pageController.sayfayiGetir);

module.exports = router;