require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
// add passport config file/ uses are strategy to validate user
const passport = require('./config/ppConfig');
// add / import isloggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');
// add these library and secret session
const flash = require('connect-flash');
const session = require('express-session');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
// add secret session middle ware
app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));
// handles request/ response for the user
// sends flash messages to the user
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  // allows you to access the currentUser anywhere in the app
  res.locals.currentUser = req.user;
  // continues to the next step in the process. 
  next();
});

// needs to be initialize after middleware
app.use(passport.initialize());
app.use(passport.session());

// Implement Routes
app.get('/', (req, res, next) => {
  res.render('index');
});

app.post('/profile', (req, res) => {
  // const { email, name, password} = req.body; 
    console.log(req.body);
  res.render('profile');
});

// app.post('/profile', (req, res) =>{
//   console.log(res.user);
//   res.render('profile');
// });

// conncet to logout file if isLoggedIn. 
app.get('auth/logout',isLoggedIn, (req, res) => {
// const {industry, ticker, price} = req.user.get();
  console.log(req.body);
  res.render('auth/logout');
});

// app.post('/logout', isLoggedIn, (req, res) => {
//   console.log(industry, ticker, price);
//   res.send('index');
// });

app.use('/auth', require('./controllers/auth'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
