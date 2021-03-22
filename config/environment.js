//this file contain development and production environemnts
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

//this is a variable which defines where the log will be stored
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
})


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'iQ4HWnCMsZ4A2RDur9NM36tIMiqlkx6g',
    db: 'social_nodes_development',
    smtp: {
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nodes.social',
            pass: 'Deev@1805'
        }
    },
    google_clientID: "*",
    google_clientSecret: "*",
    google_callbackURL: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: 'zA2NIPigBTCdbqypRNkYFsUMdExrxgIy',
    morgan: {
        mode: 'dev', 
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.SOCIAL_NODES_ASSET_PATH,
    session_cookie_key: process.env.SOCIAL_NODES_SESSION_COOKIE_KEY,
    db: process.env.SOCIAL_NODES_DB,
    smtp: {
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIAL_NODES_GMAIL_USERNAME,
            pass: process.env.SOCIAL_NODES_GMAIL_PASSWORD
        }
    },
    google_clientID: process.env.SOCIAL_NODES_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.SOCIAL_NODES_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.SOCIAL_NODES_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIAL_NODES_JWT_SECRET,
    morgan: {
        mode: 'combined', 
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.SOCIAL_NODES_ENVIRONMENT) == undefined ? development : production;
//module.exports = eval(process.env.SOCIAL_NODES_ENVIRONMENT) == undefined ? development : production;