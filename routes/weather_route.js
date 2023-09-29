// weatherRoutes.js
const express = require('express');
const { Weather } = require('../models/weather.model');
 // Import the Weather model

const router = express.Router();

// Create a new weather entry
router.post('/add_city', async (req, res) => {
  try {
    const weather = new Weather(req.body);
     await weather.save()
    res.status(201).json(weather);
  } catch (error) {
    res.status(400).json({ error: 'Could not create weather entry' });
  }
});

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page
  
    try {
      const totalWeatherEntries = await Weather.countDocuments(); // Get total count of weather entries
      const totalPages = Math.ceil(totalWeatherEntries / limit);
  
      // Calculate the skip value to skip records based on the current page
      const skip = (page - 1) * limit;
  
      const weatherData = await Weather.find()
        .skip(skip)
        .limit(limit);
  
      res.json({
        data: weatherData,
        page,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
// Retrieve weather data for a specific city by ID
router.get('/city/:id', async (req, res) => {
  try {
    const weather = await Weather.findById(req.params.id);
    if (!weather) {
      res.status(404).json({ error: 'Weather data not found' });
    } else {
      res.json(weather);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update weather data for a specific city by ID
router.put('/city/:id', async (req, res) => {
  try {
    const weather = await Weather.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!weather) {
      res.status(404).json({ error: 'Weather data not found' });
    } else {
      res.json(weather);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete weather data for a specific city by ID
router.delete('/city/:id', async (req, res) => {
  try {
    const weather = await Weather.findByIdAndRemove(req.params.id);
    if (!weather) {
      res.status(404).json({ error: 'Weather data not found' });
    } else {
      res.json({ message: 'Weather data deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
