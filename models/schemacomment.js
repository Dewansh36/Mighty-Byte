const mongoose=require('mongoose');
const User=require('./schemauser');
const Post=require('./schemapost');

const commentSchema=new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        date: {
            type: String,
            default: new Date(Date.now()).toDateString()+" "+new Date(Date.now()).toLocaleTimeString(),
        }
    }
);

const Comment=new mongoose.model('Comment', commentSchema);

module.exports=Comment;