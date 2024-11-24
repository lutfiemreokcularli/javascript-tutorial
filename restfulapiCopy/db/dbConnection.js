const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restdb')
    .then(() => console.log("veritabanına bağlanıldı"))
    .catch(hata => console.log("db bağlantı hatası"));


    