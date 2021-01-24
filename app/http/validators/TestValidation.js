const validator = requiree('/config/validate');


const signup = async function(req,res,next){

    const data=req.body;

     const rules = {
        "formUser": "required|string",
        "formPassword": "required|string|min:6",
    }
    const messages ={
        "required.formUser":"فیلد نام کاربری الزامی است",
    }


    //--- Fixed Section
    validator(data, rules, messages, (err, status) => {
        if (!status) {

            for (const property in err.errors) {
               
                let error = property+"Error"
                //console.log(error);
                req.flash(error,err.errors[property]);
            }
            //console.log(req.flash('formFieldError'))
            req.session.save(()=>{res.redirect('back');})
        } else {
            next();
        }
    });


}

module.exports={
    signup
}