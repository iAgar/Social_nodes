const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    //whenever a username and password is recieved, we need to find that user and generate the jwt corresponding to that user
    try{
        let user = await User.findOne({email: req.body.email});
        console.log(req);
        if(!user || user.password!=req.body.password){
            return res.json(500, {
                message: "Unauthorised"
            });
        }

        console.log(user);
        return res.json(200, {
            message: "Sign in successful, here is your token",
            data: {
                token: jwt.sign(user.toJSON(), 'Ishaan', {expiresIn: '30000'})
            }
        })
    }catch(err){
        console.log('Error', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
