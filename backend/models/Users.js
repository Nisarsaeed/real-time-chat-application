const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    Name:{
        type: String,
        require: true,
    },
    Email:{
        type: String,
        require: true,
        unique: true,
    },
    Password:{
        type: String,
        require: true
    },
    token:{
        type: String,
    }

});

const Users = mongoose.model('User', usersSchema);

module.exports = Users;