const router = require('express').Router();
//const User = require('../models/userModel');


const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const userController = require("../controllers/userController");

router.get('/', [authMiddleware,adminMiddleware] ,userController.tumUserlariListele)

router.get('/me', authMiddleware, userController.oturumAcanKullaniciBilgileri);
router.patch('/me', authMiddleware, userController.oturumAcanKullaniciGüncelleme);

router.post('/', userController.yeniKullaniciOlustur);
router.patch('/:id', userController.adminUserGuncelleme);
router.delete('/me',authMiddleware, userController.kullaniciKendiniSil);
router.delete('/:id',[authMiddleware,adminMiddleware], userController.adminKullaniciSil);

router.get('/deleteAll',[authMiddleware,adminMiddleware], userController.tumKullanicilariSil);



//user giriş kontrol

router.post('/giris', userController.girisYap);
module.exports = router;