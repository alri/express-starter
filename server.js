//import tools
require('dotenv').config();
const express = require('express'),
      app = express(),
      path = require('path'),
      favicon = require('serve-favicon'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks'),
      morgan = require('morgan'),
      createError = require('http-errors'),
      session = require('express-session'),
      sessionStore = require('./config/session')
      flash = require('connect-flash');
      cookieParser = require('cookie-parser'),
      cors = require('cors')

const helper  = require('./config/helper.js');
const TestLoger= require('./app/middlewares/testLogger');


//##################################################
//##################################################
//################  Set Configs ####################
//##################################################
//##################################################

app.set('env', process.env.APP_ENV); // test - production - development
app.set('trust proxy', true); //-- for nginx & varnish

const port=process.env.APP_PORT || 3000;
const host=process.env.APP_HOST;



//##################################################
//##################################################
//########### Template & Static Files ##############
//##################################################
//##################################################

app.set('views',path.join(__dirname, '/resources/views'));

var template = nunjucks.configure(app.get('views'),{
    autoescape: true,
    express: app,
    watch: true,
    noCache: false
});
template.addGlobal('url', helper.url);
template.addGlobal('css', helper.css);
template.addGlobal('js', helper.js);
template.addGlobal('img', helper.img);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//##################################################
//##################################################
//######## Using Extera Public Middlewares #########
//##################################################
//##################################################

//-------------------------- form post --------------
//---------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  // support json encoded bodies


//-------------------------- logger -----------------------
//--------------------------------------------------------
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'storage/log/access.log'), { flags: 'a' })
app.use(morgan('combined', 
                  {
                    skip: function (req, res) { return res.statusCode < 400 } ,
                    stream: accessLogStream
                  }));


//-------------------------- csrf ----------------------
//-----------------------------------------------------
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });




//-------------------------- upload -----------------------
//----------------------------------------------------------
const multer  = require('multer')
const upload = multer({ dest: './dist/uploads/' });



//---------------------------- Session & Cookie -----------
//---------------------------------------------------------
app.use(cookieParser());

app.use(session({
                    cookie: { secure: false, maxAge: 7* 24 * 60 * 60  }, //cookie 7 day
                    secret: process.env.APP_SECRET,
                    store:sessionStore.file,
                    proxy: true,
                    resave: false ,// Force save of session for each request.
                    saveUninitialized: false, // Save a session that is new, but has not been modified
                }));
              

app.use(flash());

/*
app.use(function(req, res, next){
    res.locals.flashMessage = req.flash();
    console.log(res.flashMessage);
    next();
});
*/
//------------------------------- CORS --------------------
//---------------------------------------------------------
app.use(cors());





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


//##################################################
//##################################################
//################ Run Server ######################
//##################################################
//##################################################

app.listen(port,host,()=>{
	console.log("Express is Running in : http://"+host+":"+port);
})
