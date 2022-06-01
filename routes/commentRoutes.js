const express=require('express');
const router=express.Router({ mergeParams: true });
const User=require('../models/schemauser');
const Post=require('../models/schemapost');
const Comment=require('../models/schemacomment');
const commentController=require('../controllers/commentController');
const catchAsync=require('../middleware/catchAsync');
const checkLogin=require('../middleware/checkLogin');

router.route('/new')
    .post(checkLogin, catchAsync(commentController.create));

router.route('/:cid')
    .put(checkLogin, catchAsync(commentController.edit))
    .delete(checkLogin, catchAsync(commentController.delete));

module.exports=router;

