const env = require('./environment');
const fs = require('fs');
const path = require('path')

//this is a global function that will be there in the app
//app because the function is being sent to the locals of the app
module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        //this will first check the environment i.e dev or prod
        //then will return the correct file 
        if(env.name == 'development'){
            return filePath;
        }

        //we are adding a slash as the value being passed in the view has no slash
        //the value being passed in the view has no slash as the key in rev-manifest.json has no slash
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}