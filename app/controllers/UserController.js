//-----------------------------------------
//-----------------------------------------
//------------- User Controller
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs & local Middleware
//--------------------------
const createError = require('http-errors');


//--------------------------
//------- import Models
//--------------------------
const User =require('../models/sql/UserModel');

//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function registerForm(req,res)
{
    res.render('user/register.html');
}

function registerSubmit(req,res)
{
    let user=req.body.txtUser;
    let email=req.body.txtEmail;
    let password=req.body.txtPassword;

    User.create({
        username:user,
        email: email,
        password: password,
    }).then(user=>{
        console.log(user.username);
        let message=user.username+'User is create !'
        req.flash('success',message);
        res.redirect('back');
         //res.send("user create");
         //res.end() ;
    })
      .catch(error=>{
          req.flash('errors',error.errors);
          res.redirect('back');
          //res.end();
      })


    //res.end();
}


function loginForm(req,res)
{
    res.render('user/login.html');
}


function loginSubmit(req,res){
     let username=req.body.txtUser;
     let password=req.body.txtPassword;

     User.findOne({
         where : {username:username}
     })
     .then(user=>{

        if(!user){
             req.flash('error','User Not Found !');
             res.redirect('back');
        }
         else if (!user.validPassword(password))
         {
             req.flash('error','password is wrong !');
             res.redirect('back');
         }else{
              req.session.user = user.dataValues;
              //req.session.admin=user.admin
              console.log(req.session.user);
              res.redirect('/user/panel');
         }

     })
       //res.end();
}


function logout(req, res) {
    if (req.session.user) {
        res.clearCookie('user_sid');
        req.session.destroy();
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}


function panel(req,res)
{
    const user=req.session.user.username
    const message=user+'- You are login to panel'
    res.send(message)
}

//---------------------------- Export Controller
module.exports={
    registerForm,
    registerSubmit,
    loginForm,
    loginSubmit,
    logout,
    panel
}