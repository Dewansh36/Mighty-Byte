const express=require('express');
const User=require('../models/schemauser');
const Post=require('../models/schemapost');
const Comment=require('../models/schemacomment');

module.exports.create=async (req, res, next) => {
    let { pid }=req.params;
    const post=await Post.findById(pid)
        .populate('author')
        .populate('likes')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        });
    const user=await User.findById(req.user.id);
    const comment=new Comment(req.body);
    comment.author=user.id;
    comment.post=post.id;
    console.log(post, comment);
    await comment.save();
    post.comments.push(comment);
    user.comments.push(comment);
    await post.save();
    await user.save();
    // console.log(user, post, comment);
    console.log("COmment creator:  ", post.comments);
    res.send({ success: "Commented Successfully!", post: post });
}

module.exports.edit=async (req, res, next) => {
    let { pid, cid }=req.params;
    const comment=await Comment.findByIdAndUpdate(cid, req.body, { new: true, runValidators: true });
    console.log(comment);
    res.send({ success: "Comment Edited Successfully!" });
    // req.flash('success', 'Comment Edited Successfully!');
    // res.redirect(`/posts/${pid}`);
}

module.exports.delete=async (req, res, next) => {
    let { pid, cid }=req.params;
    const comment=await Comment.findById(cid);
    const post=await Post.findById(pid)
        .populate('author')
        .populate('likes')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        });
    const user=await User.findById(req.user.id)
        .populate('comments');
    post.comments=post.comments.filter((comment) => { return comment!=null });
    user.comments=user.comments.filter((comment) => { return comment!=null });
    console.log("Post Before: ", post);
    console.log("Comment: ", comment);
    for (let i=0; i<post.comments; i++) {
        if (post.comments[i].id==comment.id) {
            post.comments.splice(i, 1);
            break;
        }
    }
    for (let i=0; i<user.comments; i++) {
        if (user.comments[i].id==comment.id) {
            user.comments.splice(i, 1);
            break;
        }
    }
    await post.save();
    await user.save();
    await Comment.findByIdAndDelete(cid);
    // console.log(user, post, comment);
    console.log("COmment deletor:  ", post.comments);
    res.send({ success: "Comment Deleted Successfully!", post: post });
}