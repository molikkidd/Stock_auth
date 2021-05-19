const passport = require('passport');
const LocalStratgey = require('passport-local').Strategy;

// Select the database you want to use
db = require('../models');

const STRATEGY =new LocalStratgey({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, cb) => {
    try {
        // finds user by email
        const user = await db.user.findOne({
            where: {email}
        });
        // if no user or invalid password, return false
        if (!user || !user.validPassword(password)) {
            cb(null,false);
        } else {
            cb(null,user);
        }
    } catch (err) {
        console.log('----ERROR BELOW----');
        console.log(err);
    }
});

passport.serializeUser((user,cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        // grabs user from db by pk = primary key
        const user = await db.user.findByPk(id);

        if(user) {
            // if we get the user back by pk return user
            cb(null, user)
        } 
     } catch (err) {
        //  if we dont get the user back then we have an error
            console.log('------Dont you see this error below?-----');
            console.log(err);
        }
});

passport.use(STRATEGY);

module.exports = passport;



