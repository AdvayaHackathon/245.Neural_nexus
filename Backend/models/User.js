const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  chatHistory: [{
    id: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    messages: [{
      text: String,
      sender: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    viewed: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 