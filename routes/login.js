const express = require('express');
const router = express.Router();
 // Assuming you have a User model

// Login form
router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login view/template
});

// Submit login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }); // Assuming your User model uses 'username' as the field for username
    if (user && user.password === password) { // Assuming your User model has a field 'password' for storing passwords
      res.redirect('/index'); // Redirect to dashboard on successful login
    } else {
      res.render('login', { message: 'Invalid username or password' }); // Render login form with error message
    }
  } catch (err) {
    console.error(err);
    res.send('Error logging in.');
  }
});

module.exports = router;
