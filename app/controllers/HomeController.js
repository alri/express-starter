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
   
    console.log(root)
    let data={
        'mongo':'MongoDB',
        'express':'ExpressJS',
        'vue':'VueJS',
        'node':'NodeJS'
    }
    res.render('index.html',data);
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