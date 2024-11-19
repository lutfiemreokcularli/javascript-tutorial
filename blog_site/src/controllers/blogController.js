const axios = require('axios');

const tumMakaleleriGetir = async (req, res) => {
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        const blogApi = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts',options);
        console.log(blogApi.data);
        res.render('./makaleler/index.ejs',{makaleler:blogApi.data});
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
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        const blogApi = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/'+ makaleID,options);
        res.render('./makaleler/makale.ejs',{makale : blogApi.data});
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
        res.json({
            mesaj: 'Hata çıktı: ' + error.response.data
        })
    }
    
}



module.exports = {
    tumMakaleleriGetir,
    tekMakaleGetir
}