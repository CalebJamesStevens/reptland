const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const path = require('path');
const Post = require('./models/Post');
const {ObjectId} = require('mongodb');
const app = express();

require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;
const User = require('./models/User');

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));


    
    
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
    

//Bodyparser
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

//Method overried
app.use(methodOverride('_method'))


// Give access to currentUser without having to pass in 
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;

    next();
});


//Routes
app.use('/api/home', require('./routes/home'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/communities', require('./routes/communities'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server start on port: ${PORT}`));