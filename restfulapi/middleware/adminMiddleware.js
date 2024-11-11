const admin = (req,res,next) =>{
    console.log(req.user.isAdmin);
    if(req.user && !req.user.isAdmin){
        return res.status(403).json({
            mesaj : 'erişimin yok'
        })
    }
    next();
}

module.exports = admin;