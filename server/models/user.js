// User schema: contain the basic information needed for user registration, authentication, and linking to their fitness goals and logs

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    goals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
    },
    activities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    nutrition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutrition'
    },
    progress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progress'
    }
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = function() {
    //const token = jwt.sign({ _id: this._id, username: this.username }, config.get('jwtPrivateKey'));
    const token = jwt.sign({ _id: this._id, username: this.username }, 'jwtPrivateKey'); // note: this should be config.get('jwtPrivateKey') like the aboev line
    return token;
    
};


const User = mongoose.model('User', userSchema);




module.exports = User;
    
