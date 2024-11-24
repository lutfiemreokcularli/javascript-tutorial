const axios = require('axios');


const tumUnitleriGetir = async (req, res) => {
    var options = { headers: { 'user-agent': 'node.js' } }
    try {
        
        const blogApi = await axios.get('http://localhost:3000/api/units',options);
        console.log(blogApi.data);
        //res.render('./makaleler/index.ejs',{makaleler:blogApi.data,sayfalama: blogApi.headers,aktifPage : aktifPage});
    } catch (error) {
        res.json({
            mesaj: 'Hata çıktı: ' + error.response.data
        })
    }
}



module.exports = {
    tumUnitleriGetir
}