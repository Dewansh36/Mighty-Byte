const express=require('express');
const mongoose=require('mongoose');
// const Mongostore=require('connect-mongo');
const app=express();
const cors=require('cors');
const passport=require('passport');
const localStrat=require('passport-local');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const User=require('./models/schemauser');
const Post=require('./models/schemapost');
const bodyParser=require('body-parser');
const path=require('path');
const flash=require('connect-flash');
const methodOverride=require('method-override');
const axios=require('axios');
require('dotenv').config();
const multer=require('multer');
require('dotenv').config();

//React-Node middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "https://bit-dev.vercel.app", // <-- location of the react app were connecting to
        credentials: true,
    })
);

//Setting Up mongoose
const connectDatabase=() => {
    mongoose.connect(process.env.db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((data) => {
            console.log(`Mongodb connected with server :${data.connection.host}`);
            // console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//Setting Up Mongo Store
// const store=new Mongostore(
//     {
//         mongoUrl: process.env.db_url,
//         secret: process.env.db_secret,
//         touchAfter: 24*3600
//     }
// );

// store.on('error', function (e) {
//     console.log(e);
// });
const port=process.env.PORT||4000;
connectDatabase()
app.listen(port, () => {
    console.log(`Listning on Port ${port}`);
});

//setting up sessions
const sessionConfig=
{
    name: 'shhh',
    secret: 'BitDev',
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
        // secure: true,
    }
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting up Flash messages
app.use(flash());

// //Setting Up Method Override for Other Requests

// app.use(methodOverride('_method'));


// //For accessing flashes
// app.use((req, res, next) => {
//     res.locals.success=req.flash('success');
//     res.locals.error=req.flash('error');
//     res.locals.user=req.user;
//     next();
// });

// For checking Login

const checkLogin=require('./middleware/checkLogin');

const partialSearch=require('./utils/partialSearch');
const loginRoutes=require('./routes/loginRoutes');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/commentRoutes');
const catchAsync=require('./middleware/catchAsync');

const conversations=require('./routes/conversations');
const messages=require('./routes/messages');
app.get('/', (req, res) => {
    res.send('<h1>APi Running!</h1>');
})

//login Routes
app.use('/', loginRoutes);

//User Routes
app.use('/user', userRoutes);

//Posts Routes
app.use('/posts', postRoutes);

// Comments Routes
app.use('/posts/:pid/comments', commentRoutes);

//conversations Routes
app.use("/api/conversations", conversations);

//Messages routes
app.use("/api/messages", messages);

app.get('/cp', checkLogin, async (req, res, next) => {
    const curuser=await User.findById(req.user.id);
    res.render('CP', { curuser });
});

app.post('/search', catchAsync(async (req, res, next) => {
    const { query, type }=req.body;
    const { finalResult }=await partialSearch(query, type);
    console.log("result:  ", finalResult);
    res.send({ success: `Results for ${query}`, finalResult });
}));

app.use((err, req, res, next) => {
    let { status=500, message="Error Occurred!" }=err;
    console.log(err);
    res.send({ error: message });
});

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found!');
})