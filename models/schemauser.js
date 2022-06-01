const mongoose=require('mongoose');
const schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');
const Post=require('./schemapost');
const Comment=require('./schemacomment');
//const autoIncrement=require('mongoose-auto-increment');

// mongoose.set('useCreateIndex', true);

const userSchema=new schema({
    //
    avatar:
    {
        type: String,
        // required: true
    },
    email:
    {
        type: String,
        required: true
    },
    displayname: {
        type: String,
        required: true
    },
    collegename: {
        type: String,
        //required:true
    },
    cfhandle: {
        type: String,
    },
    cchandle:
    {
        type: String,
    },
    ccrating: {
        type: String
    },
    cfrating: {
        type: Number
    },
    description: {
        type: String
    },
    posts: [
        {
            type: schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    friends: [
        {
            type: schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

/*memeSchema.plugin(autoIncrement.plugin,{
    model: 'meme',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});*/

userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model('User', userSchema);

module.exports=User;