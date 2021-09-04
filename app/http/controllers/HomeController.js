//-----------------------------------------
//-----------------------------------------
//------------- HTTP HomeController
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
    let data={
        'mongo':'MongoDB',
        'express':'ExpressJS',
        'vue':'VueJS',
        'node':'NodeJS'
    }
    res.render('index.njk',data);
}

function spa(req,res)
{
    res.render('layouts/spa/index.njk');
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
    spa,
    test,
    checkLogin
}