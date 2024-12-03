const axios = require('axios');


const tumPageleriGetir = async (req, res) => {
    var options = { headers: { 'user-agent': 'node.js' } }
    try {

        const blogApi = await axios.get('http://localhost:3000/api/pages', options);
        res.render('./sayfalar/index.ejs', { sayfalar: blogApi.data });
    } catch (error) {
        res.json({
            mesaj: 'Hata çıktı: ' + error.response.data
        })
    }
}

const sayfayiGetir = async (req, res) => {
    let sayfaID = req.params.id;
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        const blogApi = await axios.get('http://localhost:3000/api/pages/' + sayfaID, options);

        const sonuc = blogApi.data[0];

        res.render('./sayfalar/sayfa.ejs', {
            sayfa: {
                data: {
                    modulName: sonuc["data"].modulName,
                    elementCount: sonuc["data"].elementCount
                }
            }
        });
    } catch (error) {

        res.json({
            mesaj: 'Hata : '
        })
    }

}


module.exports = {
    tumPageleriGetir,
    sayfayiGetir
}