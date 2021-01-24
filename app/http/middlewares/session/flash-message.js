module.exports= function  (req, res, next) {
    res.locals.flashMessage = req.flash();
    next();
  };