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
    // console.log("Friends: ", curuser.friends);
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

    // console.log("Required:  ", curuser);
    // res.render;
    // console.log(curuser);
    res.send({ success: 'User Fetched', user: curuser });
}

module.exports.edit=async (req, res, next) => {
    let { id }=req.params;
    console.log(req.body);
    let changes=req.body;
    let user=await User.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
    // console.log(user);
    res.send({ success: "User Edited Successfully!", user: user });
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

module.exports.getUsr=async (req, res, next) => {
    try {
        // console.log(req.user._id)
        const user= await User.find().limit(6);
        let suggestions=[];
        for (let usr of user) {
            if(req.user.email!==usr.email && usr.friends.includes(req.user._id)==false){
                suggestions=suggestions.concat(usr);
            }
        }
        suggestions.sort((a, b) => b.friends.length - a.friends.length);
        // const user=userId? await User.findById(userId):await User.findOne({ username: username });
        // const { password, updatedAt, ...other }=user._doc;
        res.status(200).json({
            user: suggestions
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.addFriend = async (req,res,next) => {
    let {id}=req.params;
    let user1=await User.findById(req.user._id);
    let user2=await User.findById(id);
    user1.friends.push(id);
    user2.friends.push(user1._id);
    await user1.save();
    await user2.save();
    res.send({ success: "Friend added successfully!", user1: user1, user2: user2});
}

module.exports.removeFriend = async (req,res,next) => {
    let {id}=req.params;
    let user1=await User.findById(req.user._id);
    let user2=await User.findById(id);
    let index1=user1.friends.indexOf(id);
    let index2=user2.friends.indexOf(user1._id);
    user1.friends.splice(index1, 1);
    user2.friends.splice(index2,1);
    await user1.save();
    await user2.save();
    res.send({ success: "Friend removed successfully!", user1: user1, user2: user2});
}

// module.exports.getSuggestions = async (req,res,next) => {
//     console.log(req.user);
//     res.json({
//         success: true,
//     })
// }

module.exports.getUser = async(req,res,next)=>{
    const {id} = req.params
    // userId = JSON.stringify(userId)
    console.log(id)
    try {
        const user = await User.findById(id)
        // const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}