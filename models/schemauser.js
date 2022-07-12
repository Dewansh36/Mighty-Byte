const mongoose=require('mongoose');
const validator=require('validator');
const schema=mongoose.Schema;
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
//const autoIncrement=require('mongoose-auto-increment');

// mongoose.set('useCreateIndex', true);

const userSchema=new schema({
    //
    avatar:
    {
        type: String,
        // required: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,"Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false,
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

/*memeSchema.plugin(autoIncrement.plugin,{
    model: 'meme',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});*/
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getJWTToken = function  (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compare(pass,this.password)
}

const User=new mongoose.model('User', userSchema);

module.exports=User;