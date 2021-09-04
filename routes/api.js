//----------------------------------------
//----------------------------------------
//----------------- API Routes
//----------------------------------------
//----------------------------------------


//------------------------------------------
//----------- import middleware & use
//------------------------------------------
const Express = require('express');
const TokenAuthCheck=requiree('/app/api/middlewares/auth/TokenAuthCheck');

const apiRoute = Express.Router();
apiRoute.use('/v1/user',TokenAuthCheck) // all user path auth checker



//------------------------------------------
//----------- Import Validators
//------------------------------------------
const UserValidator= requiree('/app/api/validators/UserValidator')
const TodoValidator= requiree('/app/api/validators/TodoValidator')


//------------------------------------------
//----------- import controllers
//------------------------------------------
const UserController = requiree('/app/api/controllers/UserController');
const TodoController = requiree('/app/api/controllers/TodoController');




//################################################################
//################################################################
//################################################################




//-----------------------------------------------------
//---------------- User Routes
//-----------------------------------------------------

apiRoute.post('/v1/login',UserController.loginSubmit);
apiRoute.post('/v1/user/panel',UserController.panel)



//-----------------------------------------------------
//-------------------- Todo Routes
//-----------------------------------------------------

apiRoute.get('/v1/todo/create', TodoController.create); //for genetare form csrf
apiRoute.post('/v1/todo/create',TodoValidator.create, TodoController.createSubmit);

apiRoute.get('/v1/todo/update',TodoController.update); //for genetare form csrf
apiRoute.put('/v1/todo/update',TodoValidator.update, TodoController.updateSubmit);

apiRoute.get('/v1/todo/read', TodoController.read);

apiRoute.delete('/v1/todo/delete/:id', TodoController.delSubmit);



module.exports = apiRoute;