const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const validCredentials = {
    username: 'testuser',
    password: 'testpassword'
};

mongoose.connect('mongodb://localhost:27017/fitness-app')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });


app.use(cors())
app.use(express.json());

app.listen(8080, () => {
    console.log('server listening on port 8080')
})


app.use('/api/users', require('./routes/users'));
