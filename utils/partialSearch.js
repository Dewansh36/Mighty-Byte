const Post=require("../models/schemapost");
const User=require("../models/schemauser");

const partialSearch=async (search, type) => {
    let postFind=await Post.find({ title: { $regex: search, $options: "i" } })
        .populate('author');
    let userFind=await User.find({ username: { $regex: search, $options: "i" } });

    postFind=postFind.filter((post) => {
        return (post.author!=null&&post.images.length!=0)
    });

    if (type=='posts') {
        return { finalResult: postFind };
    }
    else {
        return { finalResult: userFind };
    }
}

module.exports=partialSearch;