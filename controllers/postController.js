const User=require('../models/schemauser');
const Post=require('../models/schemapost');
const express=require('express');
const multer=require('multer');
const cloudinary=require('cloudinary').v2;

module.exports.home=async (req, res, next) => {
    let posts=[];
    let user=await User.findById(req.user.id)
        .populate({
            path: 'friends',
            populate: {
                path: 'posts',
                populate: {
                    path: 'author'
                }
            }
        });
    for (let frnd of user.friends) {
        posts=posts.concat(frnd.posts);
    }
    const compare=(a, b) => {
        return new Date(b.date)-new Date(a.date);
    }
    posts.sort(compare);
    // console.log("Posts:  ", posts);
    res.send({ success: 'Fetched Posts Successfully', data: posts });
}

module.exports.view=async (req, res, next) => {
    // console.log(req.params);
    let { id }=req.params;

    const post=await Post.findById(id)
        .populate('author')
        .populate('likes')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        });
    // console.log("Post:  ", post);
    res.send({ success: 'Fetched Post', post: post });
}
module.exports.getAllPosts=async (req, res, next) => {
    const posts=await Post.find().limit(6)

    res.json({
        success: true,
        posts,
        postsCount: 6
    })
}
module.exports.create=async (req, res, next) => {
    const user=await User.findById(req.user.id);
    const post=new Post(req.body);
    console.log(req.body);
    console.log(req.files);
    post.author=user.id;
    post.datePosted=Date.now();
    for (let file of req.files) {
        let obj={
            url: file.path,
            filename: file.filename
        }
        post.images.push(obj);
    }
    await post.populate('author');
    user.posts.push(post);
    await post.save();
    await user.save();
    // console.log(post, user);
    console.log(post);
    res.send({ success: 'post created successfully!', post: post });
    // req.flash('success', 'Posted Successfully!');
    // res.redirect(`/posts/${post.id}`);
}

module.exports.edit=async (req, res, next) => {
    let post=await Post.findById(req.params.id);
    console.log("req: ", req.body, req.files);
    if (!post) {
        return next(new Apperror('Product not found', 404));
    }
    post.title=req.body.title;
    post.description=req.body.description;
    post.techStack=req.body.techStack;

    for (let file of req.files) {
        let obj={
            url: file.path,
            public_id: file.filename
        }
        const imageDetail=await cloudinary.api.resource(obj.public_id);
        post.images.push(obj);
    }
    // console.log(post.images, req.body.remove);
    if (req.body.remove) {
        for (let img of req.body.remove) {
            for (let i=0; i<post.images.length; i++) {
                console.log(post.images[i].public_id, img);
                if (post.images[i]._id==img) {
                    cloudinary.uploader.destroy(post.images[i].public_id, (err, result) => {
                        console.log(result);
                    });
                    post.images.splice(i, 1);
                    break;
                }
            }
        }
    }
    console.log("after: ", post.images, req.body.remove);
    await post.save();
    res.send({ success: "Post Edited Successfully!", post: post });
}

module.exports.delete=async (req, res, next) => {
    let { id }=req.params;
    const post=await Post.findById(id).populate('author').populate('comments');
    if (post.author.id!=req.user.id) {
        res.send({ error: "You Cant Delete Others Posts" });
    }
    const user=await User.findById(post.author.id).populate('posts');
    const index=user.posts.indexOf(post);
    if (index>-1) {
        user.posts.splice(index, 1);
    }
    await Post.findByIdAndDelete(id);
    await user.save();
    res.send({ success: "Successfully Deleted Post!" });
}

module.exports.like=async (req, res, next) => {
    let { id }=req.params;
    const post=await Post.findById(id)
        .populate('likes')
        .populate('author')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        });
    post.likes.push(req.user.id);
    // console.log(post);
    await post.save();
    console.log("Post: ", post);
    res.send({ success: "Post Liked Successfully!", post: post });
}

module.exports.dislike=async (req, res, next) => {
    let { id }=req.params;
    const post=await Post.findById(id)
        .populate('likes')
        .populate('author')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        });
    let index=post.likes.indexOf(req.user.id);
    post.likes.splice(index, 1);
    await post.save();
    console.log("Post: ", post);
    res.send({ success: "Post Disliked Successfully!", post: post });
}