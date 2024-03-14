const express = require('express');
const app = express();
const cors = require('cors');

const validCredentials = {
    username: 'testuser',
    password: 'testpassword'
};

app.use(cors())
app.use(express.json());

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match the predefined credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
})

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Check if username and password are valid
    if (email && password) {

        // Implement your registration logic here

        return res.status(200).json({ message: 'Registration successful' });
    } else {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
})
