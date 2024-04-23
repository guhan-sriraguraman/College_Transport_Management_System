const express = require('express');
const mongoose = require('mongoose');
const { checkout } = require('./routes/payment');

const app = express();




// Connect to MongoDB
mongoose.connect('mongodb://localhost/transport', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set up middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up routes

app.use('/', require('./routes/main'));
app.use('/users', require('./routes/index'));
app.use('/payment', require('./routes/payment'));
app.use('/students', require('./routes/students'));
app.use('/users',require("./routes/login"))
app.use('/users',require("./routes/register"))
app.use('/users',require("./routes/admin"))
app.use('/users',require("./routes/admin"))
app.use('/users',require("./routes/list"))




const stripe = require('stripe')('sk_test_51NxiJlSIDBjc3MxTfnzNXOleikZ2JTJmNT0eqseQIR1bSCLzzv246Eq6JBHIROzJAH7GIwTJHAYvMTAUgFi1AMiI006fmOIyj4');


const createIntent = async (req, res) => {
    console.log('Received POST request at /payment/create-payment-intent/');
  try {
    const { rollNumber, busFee, paymentMethod } = req.body;
    console.log("Processing payment...");
    let paymentIntent;

    if (paymentMethod === 'card') {
      paymentIntent = await stripe.paymentIntents.create({
        busFee: busFee * 100,  
        currency: 'inr',  
        description: 'Payment Desc', 
       
      });

      if (paymentIntent.status === 'requires_payment_method') {
        console.log(paymentIntent);
        return res.status(200).send({ success: true, paymentIntent });
      }
    } else if (paymentMethod === 'other_method') {
      console.log("Payment method not accepted")
   }    
    console.log("Processing completed.");
    res.status(400).send({ success: false, error: 'Invalid payment method or payment processing error.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000000,
      currency: "inr",
      description: 'Software development services',
  shipping: {
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'Erode',
      state: 'CA',
      country: 'US',
    },
  },
  // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error.response)
  }
});


app.get("/success-payment",async(req,res)=>{
  res.render('checkout')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
