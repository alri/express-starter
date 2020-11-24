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



//------------------------------------------
//----------- import middleware & controllers
//------------------------------------------
const tokenCheck=require('../app/middlewares/auth/tokenCheck');
const UserController = require('../app/controllers/api/UserController');


//----------------------------
//--------- use  middleware
//-----------------------------
apiRoute.use('/user',tokenCheck)



//-------------------------------
//---------------- User Routes
//-------------------------------

apiRoute.post('/login',UserController.loginSubmit);
apiRoute.post('/user/panel',UserController.panel)

module.exports = apiRoute;