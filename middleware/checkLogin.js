const checkLogin=function (req, res, next) {
    let { token }=req.cookies;
    if (!token) {
        res.send({error: 'You Are Not Autherized!'})
        res.redirect('/login');
        return;
    }
    next();
}

module.exports=checkLogin;