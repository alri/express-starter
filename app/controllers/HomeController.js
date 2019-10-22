//-----------------------------------------
//-----------------------------------------
//------------- Home Controller
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs
//--------------------------
const createError = require('http-errors');


//--------------------------
//------- import Models
//--------------------------


//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function index(req,res)
{
    res.render('index.html');
}

function test(req,res,next)
{
    res.send("test");
}

function checkLogin(req,res)
{
    res.send("test");
}

//---------------------------- Export Controller
module.exports={
    index,
    test,
    checkLogin
}