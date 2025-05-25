require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// UPDATED PATHS to match models1 folder
const Contact = require('./models1/contact');
const announcementRoutes = require('./routes/announcements');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (like admin.html)
app.use(express.static('public'));

// MongoDB Connection
console.log("Loaded MONGO_URI from .env:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Contact endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Announcements endpoint
app.use('/announcements', announcementRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
