//import tools
require('dotenv').config();
const express = require('express'),
      app = express(),
      path = require('path'),
      favicon = require('serve-favicon'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks'),
      csrf = require('csurf'),
      fileUpload = require('express-fileupload'),
      compression = require('compression'),
      morgan = require('morgan'),
      createError = require('http-errors'),
      session = require('express-session'),
      sessionStore = require('./config/session'),
      flash = require('connect-flash'),
      cookieParser = require('cookie-parser'),
      helmet = require('helmet'),
      hpp = require('hpp'),
      cors = require('cors'),
      methodOverride = require("method-override"),
      pe = require('pretty-error').start();

const helper  = require('./config/helper.js'),
      csp = require('./config/csp.js'),
      upload = require('./config/upload.js')




//##################################################
//##################################################
//########### Template & Static Files ##############
//##################################################
//##################################################

//--set root for local module require
global.requiree = require('app-root-path').require;


app.set('views',path.join(__dirname, '/resources/views'));

var template = nunjucks.configure(app.get('views'),{
    autoescape: true,
    express: app,
    watch: true,
    cache: false,
});
template.addGlobal('url', helper.url);
template.addGlobal('css', helper.css);
template.addGlobal('js', helper.js);
template.addGlobal('img', helper.img);
template.addGlobal('dist', helper.dist);

app.set('view engine', 'njk');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




//##################################################
//##################################################
//######## Using Extera Public Middlewares #########
//##################################################
//##################################################


//-------------------------- Request & Header --------------
//---------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));  // To parse URL encoded data
app.use(bodyParser.json());  // To parse json data
app.use(methodOverride("_method")); //for add put & delete to form



//------------------------- Security -------------------------
//------------------------------------------------------------
app.use(helmet.contentSecurityPolicy(csp));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use(hpp()); // protect http request parameter




//-------------------------- logger -----------------------
//--------------------------------------------------------
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'storage/log/access.log'), { flags: 'a' })
app.use(morgan('combined', 
                  {
                    skip: function (req, res) { return res.statusCode < 400 } ,
                    stream: accessLogStream
                  }));



//-------------------------- upload -----------------------
//----------------------------------------------------------
app.use(fileUpload(upload));



//---------------------------- Session & Cookie -----------
//---------------------------------------------------------
app.use(cookieParser());

app.use(session({
                    cookie: { secure: false, //true with https
                              maxAge: 2* 24 * 60 * 60 *1000,  //cookie 2 day
                              domain: process.env.APP_URL, // just runin this url
                            }, 
                    secret: process.env.APP_SECRET,
                    store:sessionStore.file,
                    resave: false ,// Force save of session for each request.
                    saveUninitialized: true, // Save a session that is new, but has not been modified
                }));
              

app.use(flash());

/*
app.use(function(req, res, next){
    res.locals.flashMessage = req.flash();
    console.log(res.locals.flashMessage);
    next();
});
*/


//-------------------------- csrf ----------------------
//-----------------------------------------------------
app.use(csrf({ cookie: true }));
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals._csrf = req.csrfToken();
  next();
});


//------------------------------- CORS --------------------
//---------------------------------------------------------
//app.use(cors());
app.use(cors({origin: true, credentials: true}));



//------------------------------- GZIP --------------------
//---------------------------------------------------------
app.use(compression());






//##################################################
//##################################################
//########## import Routes & Use Routes ############
//##################################################
//##################################################

const webRoute= require('./routes/web');
const apiRoute= require('./routes/api');

app.use('/',webRoute);
app.use('/api/',apiRoute);





//##################################################
//##################################################
//############## Error Handling ####################
//##################################################
//##################################################

// PretyError
pe.skipNodeFiles(); // this will skip events.js and http.js and similar core node files
pe.skipPackage('express'); // this will skip all the trace lines about express` core and sub-modules
pe.withoutColors(); // Errors will be rendered without coloring

// create 404 error for not defined routes
app.use(function(req, res, next) {
  next(createError(404));
});


// Error handler
app.use(function(err, req, res, next) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {'message':err.message,'status':err.status};

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
      res.render('error.njk');
  }
  
});




module.exports = app;