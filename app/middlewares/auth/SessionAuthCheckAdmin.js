module.exports =  (req, res, next)=>{
    if (req.session && req.session.user &&  req.cookies.user_sid && req.session.admin && req.session.authenticated) {
      return next();
    } else {
      const err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
      //res.redirect('/login');
    }
  }