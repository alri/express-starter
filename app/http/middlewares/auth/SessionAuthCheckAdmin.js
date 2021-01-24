module.exports =  (req, res, next)=>{
    if (req.session && req.session.user &&  req.cookies['connect.sid'] && req.session.user.admin ) {
      return next();
    } else {
      const err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
      //res.redirect('/login');
    }
  }