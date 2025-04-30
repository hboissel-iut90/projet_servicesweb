exports.logout = (req, res, next)=>{
    req.session.destroy((err)=>{
        if(!err){
            return next();
        }
    });
}
exports.home = function (req,res) {
    res.render('home');
}