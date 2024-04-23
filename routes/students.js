// students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/student');


router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('list_students', { students });
  } catch (err) {
    console.error(err);
    res.send('Error fetching students.');
  }
});


// Add to routes/students.js

// Delete a student
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.send('Error deleting student.');
  }
});

// Update a student (Render edit form)
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    res.render('edit_student', { student });
  } catch (err) {
    console.error(err);
    res.send('Error fetching student.');
  }
});

// Update a student (Submit form)
// Update a student (Submit form)
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rollNumber, homeAddress, destination, busNumber, busFee } = req.body;
  const isPaid = req.body.isPaid === 'on'; // Convert checkbox value to boolean

  try {
    await Student.findByIdAndUpdate(id, { name, rollNumber, homeAddress, destination, busNumber, busFee, isPaid });
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.send('Error updating student.');
  }
});



// Student registration form
router.get('/add', (req, res) => {
  res.render('add_student');
});


// Add a new student
router.post('/add', async (req, res) => {
  const { name, rollNumber, department,homeAddress,busNumber, destination, busFee } = req.body;
  try {
    const student = new Student({ name, rollNumber, homeAddress,busNumber,department, destination, busFee });
    await student.save();
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.send('Error adding student.');
  }
});

// Add to routes/students.js

// List all students



module.exports = router;
