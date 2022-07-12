const sendToken = (user,res)=>{
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true,
    };
    res.cookie("token",token,options).send({
        success: "Welcome back",
        user,
        token
    })
}

module.exports = sendToken