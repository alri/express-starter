//import tools
require('dotenv').config();
const express = require('express'),
      app = express(),
      path = require('path'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      engine = require('nunjucks'),
      logger = require('morgan'),
      createError = require('http-errors'),
      session = require('express-session'),
      SQLiteStore = require('connect-sqlite3')(session),
      flash = require('connect-flash');
      cookieParser = require('cookie-parser'),
      cors = require('cors')



//------------------------------------------------------
//------------------------------------------------------
//---------------  Set Configs
//------------------------------------------------------
//------------------------------------------------------

app.set('env', process.env.APP_ENV); // test - production - development
app.set('trust proxy', true); //-- for nginx & varnish

const port=process.env.APP_PORT || 3000;
const host=process.env.APP_HOST;
const accessLog = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' })



//--------------------------------------------------------
//--------------------------------------------------------
//---- Template & Static Files
//--------------------------------------------------------
//--------------------------------------------------------

engine.configure(path.join(__dirname, '/resources/views'), {
    autoescape: true,
    express: app,
    watch: true,
    noCache: true
});

app.set('views',path.join(__dirname, '/resources/views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



//--------------------------------------------------
//--------------------------------------------------
//-------- Using Extera Public Middlewares
//--------------------------------------------------
//--------------------------------------------------

//--logger
app.use(logger('common', { stream: accessLog }));


//--for form post data

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  // support json encoded bodies

//-- Session & Cookie 
app.use(cookieParser());



app.use(session({
                    store: new SQLiteStore({
                      'table':'session',
                      'db':'sessionDB',
                      'dir':'./database/'
                    }),
                    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
                    secret: process.env.APP_SECRET,
                    proxy: true,
                    resave: false,
                    saveUninitialized: false,
                }));

app.use(flash());
app.use(function(req, res, next){
    res.locals.flash = req.flash();
    next();
});

//----- CORS
app.use(cors());

//---------------------------------------------------
//---------------------------------------------------
//----- import Routes & Use Routes
//---------------------------------------------------
//---------------------------------------------------

const webRoute= require('./routes/web');
const apiRoute= require('./routes/api');

app.use('/',webRoute);
app.use('/api/',apiRoute);




//--------------------------------------------------
//--------------------------------------------------
//------ Error Handling
//---------------------------------------------------
//--------------------------------------------------


// create 404 error for not defined routes
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // respone api error & xhr ajax error
  let fullUrl=req.protocol + '://' + req.get('host') + req.originalUrl;
  let apiUrl=req.protocol + '://' + req.get('host') + '/api'
  
  if ((fullUrl.includes(apiUrl))||(req.xhr)) {
    res.status(err.status || 500);
    res.json({ 
      status:err.status || 500,
      message:err.message,
      trace:err.stack,
      error: "Server Side Error"
      })
  }else{
      //render html error page
      res.status(err.status || 500);
      res.render('error.html');
  }
  
});


//-------------------------------------------------------
//-------------------------------------------------------
//---------------- Run Server
//-------------------------------------------------------
//-------------------------------------------------------

app.listen(port,host,()=>{
	console.log("Express is Running in : http://"+host+":"+port);
})
