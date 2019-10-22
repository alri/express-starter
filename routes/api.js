//----------------------------------------
//----------------------------------------
//----------------- API Routes
//----------------------------------------
//----------------------------------------

const Express = require('express');
const apiRoute = Express.Router();

//-------------------------------------------
//---------------- import Public & Local Middleware
//--------------------------------------------

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const multer  = require('multer')
const upload = multer({ dest: '../dist/uploads/' });


//------------------------------------------
//----------- import middleware & controllers
//------------------------------------------
const tokenCheck=require('../app/middlewares/auth/tokenCheck');
const UserController = require('../app/controllers/api/UserController');


//----------------------------
//--------- use public middleware
//-----------------------------
apiRoute.use('/user',tokenCheck)

//-------------------------------
//---------------- User Routes
//-------------------------------

apiRoute.post('/login',UserController.loginSubmit);
apiRoute.post('/user/panel',UserController.panel)

module.exports = apiRoute;