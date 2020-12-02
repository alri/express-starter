const {check, validationResult} = require('express-validator');

module.exports=[
     check('username').trim().escape().not().isEmpty()
    .withMessage('User name can not be empty!')
    .bail().isLength({min: 3})
    .withMessage('Minimum 3 characters required!'),

    check('password').trim().not().isEmpty()
    .withMessage('Invalid password!'),

   //---add middleware function
  (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors)
    {
        console.log(errors)
         req.flash('validationErrors',errors);
         req.session.save(()=>{res.redirect('back')})
         res.end();
    }else
    {
        next()
    }
     
  },
];