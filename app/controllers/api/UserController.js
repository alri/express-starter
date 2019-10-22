//-----------------------------------------
//-----------------------------------------
//------------- API User Controller
//------------------------------------------
//-----------------------------------------


//-------------- imports 
const User =require('../../models/sql/UserModel');
const  jwt  =  require('jsonwebtoken');


//--------------------------------------
//----------- User api Controller Functions
//---------------------------------------


function loginSubmit(req,res){
   
        
     const username=req.body.username;
     const password=req.body.password;
     const key=req.body.api;

          
    
     User.findOne({
         where : {
                    username:username,
                    api_key:key
                }
     })
     .then(user=>{
         
         if(!user)
         {
             const response = {
                "message":"You dont have Permission !",
                "status": "error",
                "token": '',
                'expire':'',
                }
            res.status(401)
            res.json(response);
         }else if(!user.validPassword(password)){
              const response = {
                "message":"Your password is not correct !",
                "status": "error",
                "token": '',
                'expire':''
                }
            res.status(401)
            res.json(response);
         }
         else{
             //----- user have permision and create token
                const  expiresIn  =  5  *  60;
                const  accessToken  =  jwt.sign({ id: user.id,username:user.username }, process.env.APP_SECRET, {
                        expiresIn:  expiresIn
                });
             //---send token
              const response = {
                    "message":"you can access to api !",
                    "status": "success",
                    "token": accessToken,
                    "expire":expiresIn
                }
                res.status(200)
                res.json(response);
         }
        
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
    //const message=user+'- You are login to panel'
    res.json({
        'message':'You are login to panel',
        'id':id
    })
}

//---------------------------- Export Controller
module.exports={

    loginSubmit,
    panel
}