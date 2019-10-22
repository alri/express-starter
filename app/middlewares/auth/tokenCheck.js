const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    //get token
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    // Remove Bearer from string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    //decode token
    if(token)
    {
        // verifies secret and checks exp
        jwt.verify(token, process.env.APP_SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({"status":"error", "message": 'Unauthorized access.' });
            }
            req.decodedToken = decoded;
            res.locals.id=decoded.id;
            next();
        });
    }
    else{
        res.status(403);
        return res.json({
            "status":"Error",
            "message":"Token Not Exist!"
        })
    }
}