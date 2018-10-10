const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const User = mongoose.model('users');

mongoose.connect(
  keys.MONGODB_URI,
  { useNewUrlParser: true }
);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/api/save_results', async (req, res) => {
  console.log(req.body);
  const userID = req.body.userID;
  const results = req.body.results;

  const user = await User.findOneAndUpdate(
    { userID: userID },
    { $push: { userAttempts: results } }
  );

  if (user === null) {
    res.json({ error: "user doesn't exist." });
  } else {
    res.json({ success: 'record has been updated.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  // express serves up production assets e.g. main.js
  app.use(express.static('client/build'));
  // express serves up index.html for unrecognizable paths
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
