const Item = require('../models/Item');

module.exports = {
  getAll: () => Item.find(),
  getById: id => Item.findById(id),
  create: data => Item.create(data),
  update: (id, data) => Item.findByIdAndUpdate(id, data, { new: true }),
  delete: id => Item.findByIdAndDelete(id)
};
