//----------------------------------------
//----------------------------------------
//----------------- Web Routes
//----------------------------------------
//----------------------------------------

const Express = require('express');
const webRoute = Express.Router();


//-------------------------------------------
//---------------- import Route Middleware
//--------------------------------------------
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const TestLoger= require('$/app/middlewares/testLogger.js');
const flash= require('$/app/middlewares/session/flash-message');
const SessionAuthCheck=require('$/app/middlewares/auth/SessionAuthCheck');
//-------------------------------
//-------- Use Route Middleware
//------------------------------
//webRoute.use(TestLoger);
webRoute.use(flash);

webRoute.use('/user',SessionAuthCheck)



//------------------------------------------
//----------- Import Middlewares
//------------------------------------------
const userValidator = require('$/app/validators/UserValidator');

//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const HomeController = require('../app/controllers/HomeController');
const UserController = require('../app/controllers/UserController');
const TestController = require('../app/controllers/TestController');



//-------------------------------
//---------------- Home Routes
//-------------------------------

//controller
webRoute.get('/', HomeController.index);
webRoute.get('/check',SessionAuthCheck,HomeController.checkLogin);






//-------------------------------
//---------------- User Routes
//-------------------------------
webRoute.get('/register',UserController.registerForm)
webRoute.post('/register',UserController.registerSubmit);

webRoute.get('/login',UserController.loginForm);
webRoute.post('/login',userValidator,UserController.loginSubmit);

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