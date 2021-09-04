const validator = requiree('/config/validate');

let create =(req,res,next)=>{

    const data=req.body;

    const validationRule = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    validator(data, validationRule,messages, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}


let update =(req,res,next)=>{

    const data=req.body;

    const validationRule = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    validator(data, validationRule,messages, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports={
    create,
    update,
}