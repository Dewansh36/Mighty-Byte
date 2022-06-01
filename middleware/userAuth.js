const User=require("../models/schemauser");

const userAuth=async (req, res, next) => {
    let { id }=req.params;
    if (id==req.user.id) {
        return next();
    }
    req.flash('error', 'You Are Not Autherized!');
    res.redirect(`/users/${id}`);
}

module.exports=userAuth;