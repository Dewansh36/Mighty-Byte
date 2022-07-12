const User=require('../models/schemauser');
const Post=require('../models/schemapost');
const express=require('express');
const router=express.Router({ mergeParams: true });
const loginController=require('../controllers/loginController');
const passport=require('passport');
const checkLogin=require('../middleware/checkLogin');
const catchAsync=require('../middleware/catchAsync');
const userAuth = require('../middleware/userAuth');

router.route('/register')
    .post(catchAsync(loginController.register));

router.route('/login')
    .post(catchAsync(loginController.login));

router.route('/verify')
    .post(catchAsync(loginController.verify));

router.route('/getUser')
    .get(loginController.getUser);

router.route('/logout')
    .get(userAuth, loginController.logout);

router.route('/forgot')
    .post(loginController.forgot);

router.route('/reset/:token')
    // .get(loginController.renderReset)
    .post(loginController.reset);

router.route('/loginFail')
    .get((req, res, next) => {
        res.send({ error: req.flash('error') });
    })

module.exports=router;