const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// List all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { title: 'My First Express App!', items });
});

// Show form to create
router.get('/new', (req, res) => {
  res.render('form', { title: 'Sign the Guest List', item: {} });
});

// Handle create
router.post('/new', async (req, res) => {
  await Item.create(req.body);
  res.redirect('/');
});

// Show form to update
router.get('/:id/edit', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('form', { title: 'Edit Guest', item });
});

// Handle update
router.post('/:id/edit', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Handle delete
router.get('/:id/delete', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
