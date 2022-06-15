const User=require("../models/schemauser");

const userAuth=async (req, res, next) => {
    let { id }=req.params;
    if (id==req.user.id) {
        return next();
    }
    res.send({error: 'You Are Not Autherized!'})
}

module.exports=userAuth;