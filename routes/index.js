const express = require('express');
const router = express.Router();

let items = []; // Temporary storage for form data

// Homepage
router.get('/', (req, res) => {
  res.render('index', { title: 'My First Express App!', items });
});

// Form Page
router.get('/form', (req, res) => {
  res.render('form', { title: 'Sign the Guest List', message: null, items });
});

// Form submission route
router.get('/add', (req, res) => {
  const { name, feedback } = req.query;
  let message = null;

  if (name && feedback) {
    items.push({ name, feedback });
    message = "name and feedback successfully added!";
  } else {
    message = "Please fill in all fields.";
  }

  res.render('form', { title: 'Sign the Guest List', message, items });
});



module.exports = router;
