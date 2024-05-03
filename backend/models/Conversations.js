const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    members:{
        type: Array,
        require: true,
    }

});

const Conversations = mongoose.model('Conversation', conversationSchema);

module.exports = Conversations; 