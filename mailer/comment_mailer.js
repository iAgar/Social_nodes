const mailer = require('../config/nodemailer');

//this is another way of exporting the function named newComment
//usage of arrow function is not necessary
exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    mailer.transporter.sendMail({
        from: 'ishaanagarwal1805@gmail.com',
        to: comment.user.email,
        subject: "You just made a new comment!",
        html: "<h1>You just commented</h1>"
    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}