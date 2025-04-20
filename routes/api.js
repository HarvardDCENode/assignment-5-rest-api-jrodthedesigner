const express = require('express');
const router = express.Router();
const cors = require('cors');
const itemService = require('../services/itemService');

router.use(cors());
router.use(express.json());

router.get('/api/items', async (req, res) => {
  const items = await itemService.getAll();
  res.json(items);
});

router.get('/api/items/:id', async (req, res) => {
  const item = await itemService.getById(req.params.id);
  item ? res.json(item) : res.status(404).send('Not found');
});

router.post('/api/items', async (req, res) => {
  const newItem = await itemService.create(req.body);
  res.status(201).json(newItem);
});

router.put('/api/items/:id', async (req, res) => {
  const updated = await itemService.update(req.params.id, req.body);
  updated ? res.json(updated) : res.status(404).send('Not found');
});

router.delete('/api/items/:id', async (req, res) => {
  const deleted = await itemService.delete(req.params.id);
  deleted ? res.json({ message: 'Deleted' }) : res.status(404).send('Not found');
});

module.exports = router;
