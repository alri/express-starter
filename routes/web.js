//----------------------------------------
//----------------------------------------
//----------------- Web Routes
//----------------------------------------
//----------------------------------------

const Express = require('express');
const webRoute = Express.Router();


//-------------------------------------------
//---------------- import Public & Local Middleware
//--------------------------------------------
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const multer  = require('multer')
const upload = multer({ dest: '../dist/uploads/' });

const TestLoger= require('../app/middlewares/testLogger');
const SessionAuthCheck=require('../app/middlewares/auth/SessionAuthCheck');

//-------------------------------
//-------- use public middleware
//------------------------------
webRoute.use(TestLoger);
webRoute.use('/user',SessionAuthCheck)

//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const HomeController = require('../app/controllers/HomeController');
const UserController = require('../app/controllers/UserController');



//-------------------------------
//---------------- Home Routes
//-------------------------------
webRoute.get('/', HomeController.index);
webRoute.get('/test', HomeController.test);
webRoute.get('/check',SessionAuthCheck,HomeController.checkLogin);


//-------------------------------
//---------------- User Routes
//-------------------------------
webRoute.get('/register',UserController.registerForm)
webRoute.post('/register',UserController.registerSubmit);

webRoute.get('/login',UserController.loginForm);
webRoute.post('/login',UserController.loginSubmit);

webRoute.get('/logout',UserController.logout);

webRoute.get('/user/panel',UserController.panel)




module.exports = webRoute;