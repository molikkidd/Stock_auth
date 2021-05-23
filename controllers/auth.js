const express = require('express');
const router = express.Router();
// import config file
const passport = require('../config/ppConfig');
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res)=> {
  req.logOut();
  req.flash('success', 'You just logged out, see you soon');
  res.redirect('/');
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Hola Moto, Welcome Back',
  failureFlash: 'I cant give you any hints but its the username or the Password '
}));

router.post('/signup', async (req, res) => {
  const { email, name, password} = req.body; 
  try {
    const [user, created] = await db.user.findOrCreate({
      where: {email},
      defaults: {name, password}
    });
    if (created) {
      console.log(`----${user.name} was created ----`);
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${user.name}. Account was created and logged in.`
      }
      passport.authenticate('local', successObject)(req,res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  } catch (error) {
      console.log(' mission report, you have an error')
      console.log(error)
      req.flash('error', 'you choose, password or email, one of them is wrong');
      res.redirect('/auth/signup');
  }
});

module.exports = router;
