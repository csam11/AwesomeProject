// Progress Schema: 

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weightTrack: [{
      weight: Number,
      date: { type: Date, default: Date.now }
    }],
    caloricIntake: [{
      calories: Number,
      date: { type: Date, default: Date.now }
    }],
    activityProgress: [{
      activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
      date: { type: Date, default: Date.now }
    }]
  }, { timestamps: true });
  
  const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
  

