require('dotenv').config();
console.log("🔍 MONGO_URL loaded:", process.env.MONGO_URL);
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/', require('./routes/web'));
app.use('/', require('./routes/api'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
