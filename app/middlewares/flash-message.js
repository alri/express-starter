module.exports= function  (req, res, next) {
    res.locals.flash = req.flash();
    //console.log(res.locals.flash.errors)
    next();
  };