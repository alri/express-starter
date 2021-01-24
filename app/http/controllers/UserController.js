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


//--------------------------
//------- Import Models
//--------------------------
const User = requiree('/models/UserModel.js');


//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function signupForm(req,res)
{
    res.render('user/signup.njk');
}

async function signupSubmit(req,res)
{
    //------- getdata
    let user=req.body.formUser;
    let email=req.body.formEmail;
    let password=req.body.formPassword;

   
    //----------- server side validation
  
    //--check username or email exist
    let doc= await User.findOne({$or:[
            { username: user },
            { email: email }
        ]
    })

    if(doc)
    {
        req.flash('error','نامکاربری یا رمز عبور قبلا انتخاب شده');
        req.session.save(()=>{res.redirect('back');})
    }
  


    //----------- database
    const record = new User({
        'username':user,
        'email':email,
        'password':password
    });

    try{
             let doc = await record.save()

              let message=doc.username+'کاربر ایجاد شد'
              req.flash('success',message);
              req.session.save(()=>{res.redirect('back');})
    }catch(err)
     {
        //res.send(err.errors);
        req.flash('error',err.errors);
        req.session.save(()=>{res.redirect('back');})
    }
}


function signinForm(req,res)
{
    res.render('user/signin.njk');
}


async function signinSubmit(req,res){


     let username=req.body.formUser;
     let password=req.body.formPassword;

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
           req.flash('error','نام کاربری یا رمز عبور صحیح نمیباشد');
           req.session.save(()=>{res.redirect('back');})
        }
        
     }
     catch(error){
          req.flash('error','User Not Found !');
          req.session.save(function(){res.redirect('back')});
     }
}


function signout(req, res) {
    if (req.session.user) {
        res.clearCookie('user_sid');
        req.session.destroy();
        res.redirect('/');
    } else {
        res.redirect('/signin');
    }
}


function panel(req,res)
{
    const user=req.session.user.username
    const message=user+'- You are login to panel'
    //res.send(message)
    res.render('user/panel.njk');
}

//---------------------------- Export Controller
module.exports={
    signinForm,
    signinSubmit,
    signupForm,
    signupSubmit,
    signout,
    panel
}