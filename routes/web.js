const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

// Home page — list items
router.get('/', async (req, res) => {
  const items = await itemService.getAll();
  res.render('index', { title: 'My First Express App!', items });
});

// New item form
router.get('/new', (req, res) => {
  res.render('form', { title: 'Sign the Guest List', item: {} });
});

// Handle new item submission
router.post('/new', async (req, res) => {
  await itemService.create(req.body);
  res.redirect('/');
});

// Edit item form
router.get('/:id/edit', async (req, res) => {
  const item = await itemService.getById(req.params.id);
  res.render('form', { title: 'Edit Guest', item });
});

// Handle edit submission
router.post('/:id/edit', async (req, res) => {
  await itemService.update(req.params.id, req.body);
  res.redirect('/');
});

// Delete via form
router.post('/:id/delete', async (req, res) => {
  await itemService.delete(req.params.id);
  res.redirect('/');
});

// Field validation on form submit
router.post('/new', async (req, res) => {
    const { name, feedback } = req.body;
    if (!name || !feedback) {
      return res.status(400).render('form', {
        title: 'Add New Guest',
        item: req.body,
        error: 'All fields are required.'
      });
    }
    await itemService.create(req.body);
    res.redirect('/');
  });
  
  // field validation on list edit
  router.post('/:id/edit', async (req, res) => {
    const { name, feedback } = req.body;
    if (!name || !feedback) {
      const item = await itemService.getById(req.params.id);
      return res.status(400).render('form', {
        title: 'Edit Guest',
        item,
        error: 'All fields are required.'
      });
    }
    await itemService.update(req.params.id, req.body);
    res.redirect('/');
  });

module.exports = router;
