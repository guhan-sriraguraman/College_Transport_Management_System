const express = require('express');

const router = express.Router();
 // Assuming you have a User model

// Login form
router.get('/register', (req, res) => {
  res.render('register'); // Assuming you have a login view/template
});







router.post('/register', async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  // Server-side validation
  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match.');
  }

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists.');
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Successful registration
    res.status(200).send('Registration successful.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user.');
  }
});

module.exports = router;
