const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const User = require('../model/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
            User.findOne({username: username})
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: "this user does not exist"})
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done (null, false, {message: "Incorrect Password"})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )
}