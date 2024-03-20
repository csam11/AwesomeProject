const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

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
app.use('/api/activities', auth, require('./routes/activities'));
app.use('/api/progress', auth, require('./routes/progress'))
app.use('/api/goals',auth, require('./routes/goals'));

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    // Generate a unique token for the email address
    const resetToken = generateResetToken(email);
    // Send reset email containing a link with the token
    sendResetEmail(email, resetToken)
      .then(() => {
        res.status(200).json({ message: 'Password reset email sent.' });
      })
      .catch(error => {
        console.error('Error sending reset email:', error);
        res.status(500).json({ error: 'Failed to send reset email.' });
      });
  });
  
  app.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;
    // Verify the validity of the token
    if (isValidResetToken(token)) {
      // Update the password associated with the token's email address
      updatePassword(token.email, newPassword)
        .then(() => {
          res.status(200).json({ message: 'Password reset successful.' });
        })
        .catch(error => {
          console.error('Error resetting password:', error);
          res.status(500).json({ error: 'Failed to reset password.' });
        });
    } else {
      res.status(400).json({ error: 'Invalid or expired token.' });
    }
  });