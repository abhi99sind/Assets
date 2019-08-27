const path = require('path');
const assetController = require('./controllers/asset');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Asset = require('./models/asset');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const errorController = require('./controllers/error');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./up');
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + file.originalname);
    }
});
const filterMainFile = (req,file,cb) => {
    if(file.mimetype === 'application/zip'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};
const filter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};

const User = require('./models/user');
// app.use(multer({storage: storage}).single('mainFile'));
app.use(multer({storage: storage}).array('mainFile',20));
const MONGODB_URI =
  'mongodb+srv://abhi99sindh:123123123@cluster0-1dqap.gcp.mongodb.net/test?retryWrites=true&w=majority'
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const authRoutes = require('./routes/auth');


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/up',express.static(path.join(__dirname, 'up')));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
app.use(authRoutes);  

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

app.get('/', (req,res,next) => {
    res.render('start');
});
app.get('/store', (req,res,next) => {
    res.render('store');
});
app.get('/upload',(req,res,next) => {
    res.render('upload');
});
app.post('/uploads',assetController.addAsset);

app.get('/home', (req,res,next) => {
  res.render('Home');
});
app.get('/asset/:random',assetController.getAssetDetails);