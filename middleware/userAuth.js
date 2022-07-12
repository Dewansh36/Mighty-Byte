const User=require("../models/schemauser");
const jwt=require('jsonwebtoken');


const userAuth=async (req, res, next) => {
    let { token }=req.cookies;
    if (!token) {
        res.send({error: 'You Are Not Autherized!'})
        return;
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id);
    next();
}

module.exports=userAuth;