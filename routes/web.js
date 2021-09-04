//----------------------------------------
//----------------------------------------
//----------------- Web Routes
//----------------------------------------
//----------------------------------------
const Express = require('express');
const csrf = require('csurf');
const webRoute = Express.Router();

let PrettyError = require('pretty-error');
pe = new PrettyError();



//-------------------------------------------
//---------------- import Route Middleware
//--------------------------------------------

//const TestLoger= requiree('/app/http/middlewares/testLogger.js');
const flash= requiree('/app/http/middlewares/session/flash-message');
const SessionAuthCheck=requiree('/app/http/middlewares/auth/SessionAuthCheck');


//-------------------------------
//-------- Use Route Middleware
//------------------------------
//webRoute.use(TestLoger);
webRoute.use(flash);
webRoute.use('/user',SessionAuthCheck)

//---------- csrf ------------

webRoute.use(csrf({ cookie: true }));
webRoute.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals._csrf = req.csrfToken();
  next();
});


//------------------------------------------
//----------- Import Validators
//------------------------------------------
const UserValidator= requiree('/app/http/validators/UserValidator')
const TodoValidator= requiree('/app/http/validators/TodoValidator')


//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const HomeController = requiree('/app/http/controllers/HomeController');
const UserController = requiree('/app/http/controllers/UserController');
const SampleController = requiree('/app/http/controllers/SampleController');
const TestController = requiree('/app/http/controllers/TestController');
const TodoController = requiree('/app/http/controllers/TodoController');


//-------------------------------
//---------------- Home Routes
//-------------------------------

//controller
webRoute.get('/',HomeController.index);
webRoute.get('/spa', HomeController.spa);
webRoute.get('/check',SessionAuthCheck,HomeController.checkLogin);




//-------------------------------
//---------------- User Routes
//-------------------------------
webRoute.get('/signin',UserController.signinForm)
webRoute.post('/signin',UserValidator.signin,UserController.signinSubmit);

webRoute.get('/signup',UserController.signupForm);
webRoute.post('/signup',UserValidator.signup,UserController.signupSubmit);

webRoute.get('/signout',UserController.signout);

webRoute.get('/user/panel',UserController.panel)






//-----------------------------------------------------
//-----------------------------------------------------
//-------------------- Todo Controller
//-----------------------------------------------------
//-----------------------------------------------------
//------------------- Http 
webRoute.get('/todo/create',TodoController.createForm);
webRoute.post('/todo/create',TodoValidator.create, TodoController.create);

webRoute.get('/todo/update/:id([0-9]+)', TodoController.updateForm);
webRoute.put('/todo/update',TodoValidator.update, TodoController.update);

webRoute.get('/todo/read/:page?*', TodoController.read);
webRoute.delete('/todo/delete', TodoController.del);

webRoute.get('/todo/upload',TodoController.uploadForm);
webRoute.post('/todo/upload',TodoController.upload);


//------------------- JQ Ajax 
webRoute.get('/todo/jq/create',TodoController.jqCreateForm);
webRoute.post('/todo/jq/create',TodoValidator.create, TodoController.jqCreate);

webRoute.get('/todo/jq/update/:id([0-9]+)', TodoController.jqUpdateForm);
webRoute.put('/todo/jq/update',TodoValidator.update, TodoController.jqUpdate);

webRoute.get('/todo/jq/read/:page?*', TodoController.jqRead);
webRoute.delete('/todo/jq/delete', TodoController.jqDel);


//------------------- Vue Ajax 
webRoute.get('/todo/vue', TodoController.vueCurd);
webRoute.post('/todo/vue/create',TodoValidator.create, TodoController.vueCreate);
/*
webRoute.get('/todo/vue/update', TodoController.vueUpdateForm);
webRoute.put('/todo/vue/update', TodoController.vueUpdate);
*/
webRoute.delete('/todo/vue/delete', TodoController.vueDelete);


//-----------------------------------------------------
//-----------------------------------------------------
//-------------------- Sample Controller
//-----------------------------------------------------
//-----------------------------------------------------
//------------------- Mongo DB 
webRoute.get('/sample/db/insert', SampleController.dbInsert);
webRoute.get('/sample/db/read', SampleController.dbRead);
webRoute.get('/sample/db/update', SampleController.dbUpdate);
webRoute.get('/sample/db/delete', SampleController.dbDelete);




module.exports = webRoute;