const jwt = require('jsonwebtoken');
const SECRET_KEY = "BlogSystem1325";
const User = require('../models/User');

const redirect_back = (req,res,next)=>
{
    if(req.cookies.jwt)
    {
        res.redirect("/")
    }
    else
    {
        next();
    }
}

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;

    if(token)
    {
        jwt.verify(token,SECRET_KEY,(err,decodedToken) =>{
            if(err)
            {
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
        
    }
    else{
        res.redirect('/login');
    }
}

const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;

    if(token)
    {
        jwt.verify(token,SECRET_KEY, async (err,decodedToken) =>{
            if(err)
            {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
        
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser,
    redirect_back
};