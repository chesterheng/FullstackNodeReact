const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user.id is assigned by mongo
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    // Google: sees 'code in URL replies with details about this user
    // Server: Get user details
    // Server: User exists? Skip user creation : Create new record in database
    const existingUser = await User.findOne({ googleId: profile.id });
    if(existingUser) {
        return done(null, existingUser);
    }

    const user = await new User({ googleId: profile.id }).save();
    done(null, user);

}));
