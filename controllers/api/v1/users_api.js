const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async function(req, res){
    //whenever a username and password is recieved, we need to find that user and generate the jwt corresponding to that user
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user){
            return res.json(500, {
                message: "Not user"
            });
        }
        if(user.password!=req.body.password){
            return res.json(500, {
                message: "password mismatch"
            });
        }

        return res.status(200).json({
            message: "Sign in successful, here is your token",
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '1200000'})
            }
        })
    }catch(err){
        console.log('Error', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
