const mongoose = require('mongoose');

// Define the schema for Indian cities weather data
const IndianCityWeatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  weatherCondition: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  minTemperature: {
    type: Number,
    required: true,
  },
  maxTemperature: {
    type: Number,
    required: true,
  },
  clouds: {
    type: String,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  precautions: {
    type: String,
    required: true,
  },
});

// Create a model for the schema
const Weather = mongoose.model('IndianCityWeather', IndianCityWeatherSchema);

module.exports = {Weather};
