const User=require('../models/schemauser');
const Post=require('../models/schemapost');
const express=require('express');

module.exports.renderEdit=async (req, res, next) => {
    let { id }=req.params;
    const curuser=await User.findById(id);
    res.render('users/edit', { curuser });
}

module.exports.getFriends=async (req, res, next) => {
    let { id }=req.params;
    const curuser=await User.findById(id)
        .populate(
            {
                path: 'posts'
            }
        )
        .populate(
            {
                path: 'friends'
            }
        );
    // res.send(user);
    res.send({
        success: true,
        curuser
    })
    // this is the real One res.render('/users/profile', { user });
}

module.exports.profile=async (req, res, next) => {

    let { id }=req.params;
    const curuser=await User.findById(id)
        .populate(
            {
                path: 'posts',
                populate: {
                    path: 'comments'
                }
            }
        )
        .populate(
            {
                path: 'friends'
            }
        );
    curuser.comments=curuser.comments.filter((comment) => { return comment!=null });
    for (let post of curuser.posts) {
        post.comments=post.comments.filter((comment) => { return comment!=null });
        await post.save();
    }
    await curuser.save();

    console.log("Required:  ", curuser);
    // res.render;
    // console.log(curuser);
    res.send({ success: 'User Fetched', user: curuser });
}

module.exports.edit=async (req, res, next) => {
    let { id }=req.params;
    let changes=req.body;
    let user=await User.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
    console.log(user);
    res.redirect(`/users/${id}`);
}

module.exports.delete=async (req, res, next) => {
    try {
        let { id }=req.params;
        const user=findById(id);
        for (let i=0; i<user.posts.length; i++) {
            await Post.findByIdAndDelete(user.posts[i].id);
        }
        await User.findByIdAndDelete(id);
        req.user=null;
        req.flash('success', 'Successfully Deleted User');
        res.redirect('/');
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect(`/users/${id}`);
    }
}

module.exports.getUsr = async(req,res,next)=>{
    const userId = req.query.userId
    // userId = JSON.stringify(userId)
    console.log(userId)
    const username = req.query.username

    console.log(userId)
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
}