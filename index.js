const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');







app.listen(port, function(err){
    if(err){
        console.log("Error in running the server on port ", port);
        console.log(err);
    }

    console.log("Server is running on port ", port);
});