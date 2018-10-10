const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    userID: String,
    userName: String
})

mongoose.model('users', userSchema);