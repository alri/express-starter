//-----------------------------------------
//-----------------------------------------
//------------- User Controller
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs & local Middleware
//--------------------------
const createError = require('http-errors');
const bcrypt = require('bcrypt');


//--------------------------
//------- import Models
//--------------------------
const User = require('../models/UserModel.js');
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

    const record = new User({
        'username':user,
        'email':email,
        'password':password
    });

    record.save()
           .then(doc => {
              let message=doc.username+' User is create !'
              req.flash('success',message);
              res.redirect('back');
            })
          .catch(err => {
                //res.send(err.errors);
                
                req.flash('error',err.errors);
                res.redirect('back');
            })
}


function loginForm(req,res)
{
    res.render('user/login.html');
}


function loginSubmit(req,res){
     let username=req.body.txtUser;
     let password=req.body.txtPassword;

    
  User
  .findOne({
    username: username // search query
  })
  .then(doc => {
    if(doc)
    {
        bcrypt.compare(password, doc.password, function (err, result) {
        
        if (result === true) {
          //create session and login
          let userData={
              'id':doc._id,
              'username':doc.username
          }
          req.session.user = userData;
          res.redirect('/user/panel');
          
        } else {
          // create error
           req.flash('error','Username or Password is not true !');
           res.redirect('back');
            }
        })
    }

    else if(!doc)
    {
        req.flash('error','User Not Found !');
        res.redirect('back');
    }

  })
  .catch(err => {
   //res.send(err)
    req.flash('errors',err.errors);
    res.redirect('back');
  })

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