const axios = require('axios');


const tumPageleriGetir = async (req, res) => {
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        
        const blogApi = await axios.get('http://localhost:3000/api/pages',options);
        res.render('./sayfalar/index.ejs',{sayfalar:blogApi.data});
    } catch (error) {
        res.json({
            mesaj: 'Hata çıktı: ' + error.response.data
        })
    }
}

const sayfayiGetir = async (req, res) => {
    let sayfaID = req.params.id;
    console.log(sayfaID);
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        const blogApi = await axios.get('http://localhost:3000/api/pages/'+ sayfaID,options);
        partsArray = [
            {image : 'https://cdn.minticity.com/assets/mintibuch/starter/wer-bist-du/seite-1/junior/box1.png'},
            {image : 'https://cdn.minticity.com/assets/mintibuch/starter/das-deutsche-abc/seite-1/junior/1.png'}
        ]
        res.render('./sayfalar/sayfa.ejs',{sayfa : blogApi.data ,gameWidth: 1813,
            gameHeight: 884,
            backgroundColor: '#0023ff',parts : partsArray});
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
    tumPageleriGetir,
    sayfayiGetir
}