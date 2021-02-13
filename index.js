const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Allows reading form data
app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting up the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

//this middleware defines a session cookie
app.use(session({
    name: 'social_nodes',
    secret: 'empty', //this is used to encrypt a session cookie
    saveUninitialized: false, //prohibits saving of data in session cookie if user is not logged in
    resave: false, //prohibits rewriting of cookie data if no change has taken place
    cookie: {
        maxAge: 1000*60*10
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup successfull');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));





app.listen(port, function(err){
    if(err){
        console.log("Error in running the server on port ", port);
        console.log(err);
    }

    console.log("Server is running on port ", port);
});