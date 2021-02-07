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
const TokenAuthCheck=requiree('/app/api/middlewares/auth/TokenAuthCheck');
const UserController = requiree('/app/api/controllers/UserController');


//----------------------------
//--------- use  middleware
//-----------------------------

//------------ all user path auth checker
apiRoute.use('/v1/user',TokenAuthCheck)



//-------------------------------
//---------------- User Routes
//-------------------------------

apiRoute.post('/v1/login',UserController.loginSubmit);
apiRoute.post('/v1/user/panel',UserController.panel)

module.exports = apiRoute;