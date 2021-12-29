const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const mongoose = require('mongoose');
const passport = require('passport')

const app = express();

require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

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

// Give access to currentUser without having to pass in 
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server start on port: ${PORT}`));