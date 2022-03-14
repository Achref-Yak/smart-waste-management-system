const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');t

const groupeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please give your team a name']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  cover: {
    type: String,
    default: 'default.jpg'
  },
  type: {
    type: String,
    enum: ['social', 'squad', 'gang', 'team','club','crew','community'],
    default: 'social'
  },
  size: {
    type: int,
    default: 4
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic"
    }
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  
  
});

 

 

const User = mongoose.model('Groupe', groupeSchema);

module.exports = User;
