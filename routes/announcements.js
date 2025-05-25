// routes/announcements.js

const express = require('express');
const router = express.Router();
const Announcement = require('../models1/announcement'); // ✅ updated path

// POST: Add new announcement
router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Announcement text is required' });
  }

  try {
    const newAnnouncement = new Announcement({ text: text.trim() });
    await newAnnouncement.save();
    res.status(201).json({ message: 'Announcement added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add announcement' });
  }
});

// GET: Get all announcements (latest first)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

module.exports = router;
