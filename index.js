const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./models/User')
require('./services/passport')

mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true })

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
})

app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);


