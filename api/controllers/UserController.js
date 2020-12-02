//-----------------------------------------
//-----------------------------------------
//------------- API User Controller
//------------------------------------------
//-----------------------------------------





//-------------- import lib & middleware
const  jwt  =  require('jsonwebtoken');
const bcrypt = require('bcrypt');


//------------- import model
const User = require('$/app/models/UserModel.js');


//--------------------------------------
//----------- User api Controller Functions
//---------------------------------------


function loginSubmit(req,res){
   
        
     const username=req.body.username;
     const password=req.body.password;
     const apiKey=req.body.apikey;

     User
  .findOne({
    username: username,
    apiKey:apiKey
  })
  .then(doc => {
    if(doc)
    {
        bcrypt.compare(password, doc.password, function (err, result) {
        
        if (result === true) {
          
           //----- user have permision and create token
            const  expiresIn  =  5  *  60;
            const  accessToken  =  jwt.sign({ id: doc._id,username:doc.username }, process.env.APP_SECRET, {
                    expiresIn:  expiresIn
            });
            //---send token
            const response = {
                    "message":" authentication is true !",
                    "status": "success",
                    "token": accessToken,
                    "expire":expiresIn
            }
            res.status(200)
            res.json(response);
          
        } else {
          // create error
           const response = {
                "message":"Your password is not correct !",
                "status": "error",
                "token": '',
                'expire':''
                }
            res.status(401)
            res.json(response);
            }
        })
    }

    else if(!doc)
    {
        const response = {
                "message":"User or Key not found !",
                "status": "error",
                "token": '',
                'expire':'',
                }
            res.status(401)
            res.json(response);
    }

  })
  .catch(err => {
   //res.send(err)
     const response = {
                "message":"Server Error !",
                "status": "error",
                "token": '',
                'expire':'',
                }
            res.status(500)
            res.json(response);
  })     

}


function logUout(req, res) {
  res.status(200)
  res.json({ auth: false, token: null });
};



function panel(req,res)
{
     //id=res.locals.id;
     id=req.decodedToken.id;
     username=req.decodedToken.username
    //const message=user+'- You are login to panel'
    res.json({
        'message':'You are login to panel',
        'id':id,
        'username':username
    })
}

//---------------------------- Export Controller
module.exports={

    loginSubmit,
    panel
}