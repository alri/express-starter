const Validator = require('validatorjs');

//----setup Validator Extra Work


//------ Begin Validation

const create = async function(req,res,next){

    const data=req.body;

     const rules = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    let validation = await new Validator(data, rules ,messages);

    if(validation.passes())  // true
    next()

    if(validation.fails())  // false
    {
        console.log(req.xhr)
        if (req.xhr) {
            //---check ahax request
           
            let data={
                'code':422,
                'status':'error',
                'message':'validation errors',
                'validation':validation.errors.all()
            }
            return res.status(422).json(data)
       }else{
          
           //------------ http request
        //console.log(validation.errors.all())
        for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                req.flash(error,validation.errors.all()[property]);
            }

         req.session.save(()=>{res.redirect('back');})
        }

    } 
}



const update = async function(req,res,next){

    const data=req.body;

     const rules = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
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
            //------ http request

             //console.log(validation.errors.all())
            for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                req.flash(error,validation.errors.all()[property]);
            }

            req.session.save(()=>{res.redirect('back');})
        }

    } 
}

module.exports={
    create,
    update,
}