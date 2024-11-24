const axios = require('axios');

const aramaYap = async (req, res) => {
    var options = { headers: { 'user-agent': 'node.js' } }
    let sayfalama = "";
    let aktifPage = 1;

    if(req.query.page){
        sayfalama = "page=" + req.query.page;
        aktifPage = req.query.page;
    }
    let aranacakKelime = req.body.search;
    let combining = /[\u0300-\u036F]/g;
    aranacakKelime = aranacakKelime.normalize('NFKD').replace(combining,'');
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        
        const blogApi = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search='+ aranacakKelime,options);
        res.render('./makaleler/index.ejs',{makaleler:blogApi.data,sayfalama: blogApi.headers,aktifPage : aktifPage});
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
        res.json({
            mesaj: 'Hata çıktı: ' + error.response.data
        })
    }
    
}

const tumMakaleleriGetir = async (req, res) => {
    var options = { headers: { 'user-agent': 'node.js' } }
    let sayfalama = "";
    let aktifPage = 1;

    if(req.query.page){
        sayfalama = "page=" + req.query.page;
        aktifPage = req.query.page;
    }
    try {
        const moduleName = "nthaudioInputKontrolle";
        const blogApi = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&'+sayfalama,options);
        res.render('./makaleler/index.ejs',{makaleler:blogApi.data,sayfalama: blogApi.headers,aktifPage : aktifPage});
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
        res.json({
            mesaj: 'Hata çıktı: ' + error.response.data
        })
    }
}

const tekMakaleGetir = async (req, res) => {
    let makaleID = req.params.id;
    const moduleName = "meka1.js";
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        const blogApi = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/'+ makaleID,options);
        //modulu sunucu tarafında yükler.
        //const dynamicModule = require(`./modules/${moduleName}`);
        res.render('./makaleler/makale.ejs',{makale : blogApi.data , moduleName});
        //res.render('./makaleler/makale.ejs',{makale : blogApi.data});
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
        res.json({
            mesaj: 'Hata : ' + error.response.data
        })
    }
    
}



module.exports = {
    tumMakaleleriGetir,
    tekMakaleGetir,
    aramaYap
}