const queue = require('../config/kue');
const commentsMailer = require('../mailer/comment_mailer');

//every worker has to have a process function that tells the worker that whenever a new task comes into the queue, the task is run inside this process function
//the first argument is the name of queue
//job is what it needs to do
queue.process('emails', function(job, done){
    console.log('Emails worker is processing the job');

    commentsMailer.newComment(job.data);
    done();
})