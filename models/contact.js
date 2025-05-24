<<<<<<< HEAD
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

module.exports = mongoose.model('Contact', contactSchema);
=======
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

module.exports = mongoose.model('Contact', contactSchema);
>>>>>>> ac03125ee63eac0acf723ca2ca5fba67c7a5b7d5
