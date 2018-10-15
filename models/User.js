const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userID: String,
  userName: String,
  userAttempts: [{
      date: Date,
      continent: String,
      score: String
  }]
});

mongoose.model('users', userSchema);
