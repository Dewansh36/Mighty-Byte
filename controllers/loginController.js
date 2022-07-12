const User=require('../models/schemauser');
const passport=require('passport');
const localStrat=require('passport-local').Strategy;
const express=require('express');
const { nanoid }=require('nanoid');
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer');
const sendToken=require('../utils/jwtToken');
const transporter=nodemailer.createTransport(
    {
        service: 'hotmail',
        auth: {
            user: process.env.email,
            pass: process.env.email_password,
        }
    }
);
module.exports.verify=async (req, res, next) => {
    let user=req.body.user;
    user=await User.create(user);
    res.send({ success: 'Account created successfully!', user: user });
    const resetEmail={
        to: user.email,
        from: process.env.email,
        subject: 'Account Has Been Successfully Verified',
        text: `
                    Account Has Been Successfully Created At BITDEV
                    Please Login to https://${req.headers.host}/login
            `,
    }
    transporter.sendMail(resetEmail, (err, info) => {
        if (err) {
            console.log(err);
            res.send({ error: 'Error While Sending Mail' });
        }
        else {
            console.log(info.response);
            res.send({ success: 'Successfully Registered!' });
        }
    })
}
module.exports.register=async (req, res, next) => {
    console.log(req.body);
    const alreadyuser=await User.findOne({ email: req.body.email });
    if (alreadyuser!=undefined) {
        res.send({ error: 'User with that email already exists!' });
        return;
    }
    const user={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        displayname: req.body.firstName+" "+req.body.lastName,
        collegename: req.body.collegeName,
        cfhandle: req.body.codeforces,
        cchandle: req.body.codechef,
        description: req.body.description,
        avatar: `https://avatars.dicebear.com/api/micah/${req.body.firstName}.svg`
    }
    console.log(user);
    const token=Math.floor(Math.random()*900000+100000);
    req.session.code=token;
    const registerEmail={
        from: process.env.email,
        to: req.body.email,
        subject: "Email Verfication",
        text: `
            CODE: ${token}
            If you did not request this, please ignore this email.
          `,
    }
    transporter.sendMail(registerEmail, (err, info) => {
        if (err) {
            console.log(err);
            res.send({ error: 'Error While Sending Mail' });
        }
        else {
            console.log(info);
            res.send({ success: 'Verification mail is sent!', user: user, token: token });
        }
    })
}

module.exports.login=async (req, res, next) => {
    const { email, password }=req.body;
    if (!email||!password) {
        res.send({ error: "Please enter email or password" });
        return;
    }
    const user=await User.findOne({ email }).select("+password");
    if (!user) {
        res.send({ error: "Invalid email" });
        return;
    }
    const isPasswordMatched=await user.comparePassword(password)
    if (!isPasswordMatched) {
        res.send({ error: "Invalid password" });
        return;
    }
    console.log(user);
    req.session.user=user;
    sendToken(user, res);
}

module.exports.getUser=async (req, res, next) => {
    console.log(req.session);
    let { token }=req.cookies;
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decodedData.id);
    if (user==undefined) {
        res.send({ error: 'You Must be Logged In!' });
        return;
    }
    let id=decodedData.id;
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
    // curuser.comments=curuser.comments.filter((comment) => { return comment!=null });
    // for (let post of curuser.posts) {
    //     post.comments=post.comments.filter((comment) => { return comment!=null });
    //     await post.save();
    // }
    // await curuser.save();
    res.send({ user: curuser });
}

module.exports.forgot=async (req, res, next) => {
    const token=nanoid(10);
    const user=await User.findOne({ email: req.body.email });
    if (user==undefined) {
        res.send({ error: 'No account with that email address exists' });
    }
    user.resetPasswordToken=token;
    user.resetPasswordExpires=Date.now()+43200;
    await user.save();
    const resetEmail={
        from: process.env.email,
        to: req.body.email,
        subject: "Password Reset",
        text: `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        CODE: ${token}
        If you did not request this, please ignore this email and your password will remain unchanged.
      `,
    }
    transporter.sendMail(resetEmail, (err, info) => {
        if (err) {
            console.log(err);
            res.send({ error: 'Error While Sending Mail' });
        }
        else {
            console.log(info.response);
            res.send({ success: `An e-mail has been sent to ${req.body.email} with further instructions`, })
        }
    })
}

module.exports.renderReset=async (req, res, next) => {
    let { token }=req.params;
    const user=await User.findOne({ resetPasswordToken: token });
    if (!user||user.resetPasswordExpires<Date.now()) {
        req.flash('error', 'Password reset token is invalid or has expired');
        res.redirect('/forgot');
    }
    console.log(user);
    res.render('users/reset', { token });
}

module.exports.reset=async (req, res, next) => {
    if (req.body.password!=req.body.cpass) {
        req.flash('error', 'Both Fields Should Match!');
        res.redirect('/reset');
    }
    let { toekn, password }=req.body;
    const user=await User.findOne({ resetPasswordToken: token });
    console.log(user, password);
    await user.setPassword(password);
    await user.save();
    const resetEmail={
        to: user.email,
        from: process.env.email,
        subject: 'Your password has been changed',
        text: `
        Password Reset Successfull
         This is a confirmation that the password for your account "${user.email}" has just been changed.
          Please Login With New Credentials
        `,
    }
    transporter.sendMail(resetEmail, async (err, info) => {
        if (err) {
            console.log(err);
            res.send('Error While Sending Mail');
        }
        else {
            console.log(info.response);
            user.resetPasswordExpires=null;
            user.resetPasswordToken=null;
            await user.save();
            req.flash('success', 'Password Reset Successfull!');
            res.redirect('/login');
        }
    })
}


module.exports.logout=(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    req.session.user=undefined;
    res.send({ success: 'Aloha! See you Soon!' });
}