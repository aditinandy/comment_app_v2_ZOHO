require('dotenv').config();
  const path = require('path');
  const express = require('express');
  const bodyParser = require('body-parser');
const connection = require("./db");

  const session = require('express-session');
  const MongoDBStore = require('connect-mongodb-session')(session);
  const cors = require('cors');
  const corsOptions = {
    origin: true,
    credentials: true
  }

const User = require('./models/user');
const Comment = require('./models/comment');
  
  const app = express();
app.use(cors(corsOptions));
// app.use(cors());

  app.options('*', cors(corsOptions));

  const store = new MongoDBStore({
    uri: process.env.DBC,
    collection: 'sessions'
  });

  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
  );

  // app.use(csrfProtection);
  
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'ejs');
  app.set('views', 'views');

  const userRoutes = require('./routers/signup');
//   const commentRoutes = require('./routes/comment');
  
//   app.use('/image', express.static('upload_food'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())
  
  // app.use(express.static(__dirname + '/views'));
  // app = express().use(express.static(__dirname + '/views'));
  app.use(express.static(__dirname));

  // app.use(multer({
    // dest: path.join(__dirname, 'uploads/')}).single('img'));

    // app.use(flash())

  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        console.log(user);
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use('/user', userRoutes);
//   app.use('/user', commentRoutes);

connection()
  .then(client => {
    console.log('Connected port 8000');
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
});