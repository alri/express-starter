//-----------------------------------------
//-----------------------------------------
//------------- User Controller
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- Import & Use Extra Lib
//--------------------------
const createError = require('http-errors');
const bcrypt = require('bcrypt');
//const { body, validationResult } = require('express-validator');


//--------------------------
//------- Import Models
//--------------------------
const User = require('$/app/models/UserModel.js');


//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function registerForm(req,res)
{
    res.render('user/register.html');
}

async function registerSubmit(req,res)
{
    let user=req.body.txtUser;
    let email=req.body.txtEmail;
    let password=req.body.txtPassword;

    const record = new User({
        'username':user,
        'email':email,
        'password':password
    });

    try{
             let doc = await record.save()

              let message=doc.username+' User is create !'
              req.flash('success',message);
              req.session.save(()=>{res.redirect('back');})
    }catch(err)
     {
        //res.send(err.errors);
        req.flash('error',err.errors);
        req.session.save(()=>{res.redirect('back');})
    }
}


function loginForm(req,res,next)
{
    res.render('user/login.html');
}


async function loginSubmit(req,res){

    console.log("crash")

     let username=req.body.txtUser;
     let password=req.body.txtPassword;

     try{
         let doc= await User.findOne({
                            username: username // search query
                        })
              
         let match = await bcrypt.compare(password, doc.password)
        
          if (match) {
           //create session and login
           let userData={
              'id':doc._id,
              'username':doc.username
           }
           req.session.user = userData;
           req.session.save(()=>{res.redirect('/user/panel');})
        
        } else {
          // create error
           req.flash('error','Username or Password is not true !');
           req.session.save(()=>{res.redirect('back');})
        }
        
     }
     catch(error){
          req.flash('error','User Not Found !');
          req.session.save(function(){res.redirect('back')});
     }
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