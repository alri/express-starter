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
const tokenCheck=requiree('/app/api/middlewares/auth/tokenCheck');
const UserController = requiree('/app/api/controllers/UserController');


//----------------------------
//--------- use  middleware
//-----------------------------
apiRoute.use('/v1/user',tokenCheck)



//-------------------------------
//---------------- User Routes
//-------------------------------

apiRoute.post('/v1/login',UserController.loginSubmit);
apiRoute.post('/v1/user/panel',UserController.panel)

module.exports = apiRoute;