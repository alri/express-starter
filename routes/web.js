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
const flash= require('../app/middlewares/flash-message');
const SessionAuthCheck=require('../app/middlewares/auth/SessionAuthCheck');

//-------------------------------
//-------- use public middleware
//------------------------------
//webRoute.use(TestLoger);
webRoute.use(flash);
webRoute.use('/user',SessionAuthCheck)

//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const HomeController = require('../app/controllers/HomeController');
const UserController = require('../app/controllers/UserController');
const TestController = require('../app/controllers/TestController');



//-------------------------------
//---------------- Home Routes
//-------------------------------
webRoute.get('/', HomeController.index);
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




//-----------------------------------------------------
//-----------------------------------------------------
//-------------------- Test Controller
//-----------------------------------------------------
//-----------------------------------------------------

//------------------- Mongo DB 
webRoute.get('/test/db/insert', TestController.dbInsert);
webRoute.get('/test/db/read', TestController.dbRead);
webRoute.get('/test/db/update', TestController.dbUpdate);
webRoute.get('/test/db/delete', TestController.dbDelete);



module.exports = webRoute;