const Post=require("../models/schemapost");

const postAuth=async (req, res, next) => {
    const { id }=req.params;
    const post=await Post.findById(id)
        .populate('author');
    if (post.author.id==req.user.id) {
        return next();
    }
    req.flash('error', 'You Are Not Autherized');
    res.redirect(`/post/${id}`);
}

module.exports=postAuth;