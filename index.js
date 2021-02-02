const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

app.set('view engine', 'ejs');
app.set('views', './views');





app.listen(port, function(err){
    if(err){
        console.log("Error in running the server on port ", port);
        console.log(err);
    }

    console.log("Server is running on port ", port);
});