const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Social_Nodes');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database::MongoDB');
});

module.exports = db;