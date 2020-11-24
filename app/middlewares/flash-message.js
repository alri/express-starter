module.exports= function  (req, res, next) {
    
    res.locals.flashMessage = req.flash();
    console.log(res.locals.flashMessage)
    next();
  };