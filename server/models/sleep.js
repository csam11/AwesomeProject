
const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sleepTrack: [{
      sleep: Number,
      date: { type: Date, default: Date.now }
    }],
    bedtime: {
      type: String
    },
  }, { timestamps: true });
  
  const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
  
