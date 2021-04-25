const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(env.db);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database::MongoDB');
});

module.exports = db;