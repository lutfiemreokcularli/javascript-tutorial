const hataYakalayici = (err,req,res,next)=>{
   
   console.log(err);

   if(err.code == 11000){
    return res.json({
        mesaj : Object.keys(err.keyValue) + " için " + Object.values(err.keyValue) + "değeri daha önce alınmış"
    })
   }
    res.json({
        mesaj : err.message,
        hataKodu: err.statusCode
    })
}
module.exports = hataYakalayici;