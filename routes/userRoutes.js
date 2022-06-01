const User=require('../models/schemauser');
const Post=require('../models/schemapost');
const express=require('express');
const router=express.Router({ mergeParams: true });
const userController=require('../controllers/userController');
const checkLogin=require('../middleware/checkLogin');
const userAuth=require('../middleware/userAuth');
const catchAsync=require('../middleware/catchAsync');

router.route('/')
    .get(userController.getUsr)
    
router.route('/:id')
    .get(checkLogin, userController.profile)
    .put(checkLogin, userAuth, catchAsync(userController.edit))
    .delete(checkLogin, userAuth, catchAsync(userController.delete));

router.route('/:id/edit')
    .get(checkLogin, userAuth, userController.renderEdit);

router.route('/:id/friends')
    .get(catchAsync(userController.getFriends));
module.exports=router;