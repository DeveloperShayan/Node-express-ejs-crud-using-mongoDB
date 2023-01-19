const Auth = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "BlogSystem1325";

const HandleErrors = (err) =>{
   console.log(err.message,err.code);
   let errors = {name : "", email : "" , username: "", password : ""};
   
   //duplicate error code 

   if(err.code === 11000)
   {
      errors.email = "User with this email already registered";
         return errors.email;
   }
   console.log(err.message);
   if(err.message == "Incorrect Email")
   {
      errors.email = "Incorrect Email";
   }

   if(err.message == "Incorrect Password")
   {
      errors.password = "Incorrect Password";
   }
   
   //Validation errors
   if(err.message.includes('user validation failed'))
   {
     Object.values(err.errors).forEach((properties) => {
         errors[properties.path] = properties.message;
     })
   }
   return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
   return jwt.sign({ id }, SECRET_KEY, {
      expiresIn : maxAge
   });
}

const signup = (req,res) =>{
   res.render('Auth/Register',{title : 'Registration'})
}
const signup_process = async (req,res)=>{
   const {name,email,username,password} = req.body;

   try {
      const user = await Auth.create({name , email, username, password});
      const token = createToken(user._id);
      res.cookie('jwt',token, {httpOnly : true, maxAge : maxAge * 1000})
      res.status(201).json({user : user._id});

   } catch (err) {
      const errors = HandleErrors(err);
      res.json({ errors });
   }
}

const login = (req,res) =>{
   res.render('Auth/Login',{title : 'Login'})
}

const login_process = async (req,res) => {
   const {email , password} = req.body;
   try {
      const user = await Auth.login(email,password);
      const token = createToken(user._id);
      res.cookie('jwt',token, {httpOnly : true, maxAge : maxAge * 1000})
      res.status(201).json({user : user._id});

      
   } catch (err) {
      const errors = HandleErrors(err);
      res.status(400).json({errors});
   }
}


const user_profile = (req,res) =>{
   res.render('user_profile',{title : 'User Profile'})
}

const logout = (req,res) => {
   res.cookie('jwt','',{maxAge:1});
   res.redirect('/');
}

 module.exports = {
    signup,
    signup_process,
    login,
    login_process,
    user_profile,
    logout
 }