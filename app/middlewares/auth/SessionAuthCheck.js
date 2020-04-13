module.exports =  (req, res, next)=>{
  console.log(req.cookies['connect.sid'])
    if (req.session && req.session.user &&  req.cookies['connect.sid'] ) {
      return next();
    } else {
      const err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
      //res.redirect('/login');
    }
  }

