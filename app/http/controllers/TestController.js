//-----------------------------------------
//-----------------------------------------
//------------- Test Controller
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
//----------- Test Controller Functions
//---------------------------------------

function index(req,res)
{
    res.render('index.html');
}


//---------------------------- Export Controller
module.exports={
    index,
}