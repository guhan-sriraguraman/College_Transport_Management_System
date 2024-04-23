const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Payment form
router.get('/', (req, res) => {
  res.render('payment');
});

router.get('/checkout',(req,res)=>{
  res.render('checkout')
})

// Submit payment
router.post('/', async (req, res) => {
    const { rollNumber } = req.body;
    try {
      const student = await Student.findOne({ rollNumber });
      console.log(student);
      if (student) {
        res.render('payment_details', { student:student }); // Render payment form with student details
      } else {
        res.render('payment_details', { student: null, message: 'Student not found!' }); // Pass message if student not found
      }
    } catch (err) {
      console.error(err);
      res.send('Error processing payment.');
    }
  });
module.exports = router;
