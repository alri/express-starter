const Validator = require('validatorjs');

//----setup Validator Extra Work
const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[-# -/:-@\[-`{-~]).{6,64}$/;

Validator.register('password_policy', value => passwordRegex.test(value),
    'انتخاب یک عدد و یک کاراکتر خاص نظیر @ الزامی است');


//------ Begin Validation

const signup = async function(req,res,next){

    const data=req.body;

     const rules = {
        "formUser": "required|string",
        "formPassword": "required|string|min:6|confirmed",
    }
    const messages ={
        "required.formUser":"فیلد نام کاربری الزامی است",
    }

    let validation = await new Validator(data, rules ,messages);

    if(validation.passes())  // true
    next()

    if(validation.fails())  // false
    {
        if (req.xhr) {
            //---check ajax request
           
            let data={
                'code':422,
                'status':'error',
                'message':'validation errors',
                'validation':validation.errors.all()
            }
            return res.status(422).json(data)
       }else{
           //---------- http request
        //console.log(validation.errors.all())
        for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                //console.log(error);
                req.flash(error,validation.errors.all()[property]);
            }

         req.session.save(()=>{res.redirect('back');})
        }
    } 
}

module.exports={
    signup
}