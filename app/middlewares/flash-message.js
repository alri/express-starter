module.exports= function  (req, res, next) {
  
    res.locals.flashError = req.flash('error');
    res.locals.flashErrors = req.flash('errors');
    res.locals.flashSuccess = req.flash('success');
    next();
  };