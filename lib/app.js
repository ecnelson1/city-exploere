const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const { keyLocation, keyWeatherCast, keyReview } = require('./mungeWorthy.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const authRoutes = createAuthRoutes();
app.use('/auth', authRoutes);
app.use('/api', ensureAuth);
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;
    const location = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.Geocode_key}&q=${city}&format=json`);
    const finalDestination = keyLocation(location.body);
    res.json(finalDestination);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
app.get('/weather', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const weather = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=${process.env.Weather_key}`);
    const finalWeather = keyWeatherCast(weather.body);
    res.json(finalWeather);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
app.get('/reviews', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const key = process.env.Review_key;
    const reviews = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}`)
      .set('Authorization', `Bearer ${key}`)
      .set('Accept', 'application/json');
    const finalReview = keyReview(reviews.body);
    res.json(finalReview);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
