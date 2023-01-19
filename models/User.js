const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bycrypt = require('bcrypt');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    name :{
        type : String,
        required : [true, "Please enter a name"],
        uppercase : true
    },
    username : {
        type : String,
        required : [true, "Please enter a username"],
        lowercase : true,
        unique : true,
    },
    email : {
        type : String,
        required : [true, "Please enter an email"],
        unique : true,
        lowercase : true,
        validate : [isEmail , "Please enter a valid email"]
        
    },
    password : {
        type : String,
        required : [true, "Please enter a password"],
        minLength : [6, "Minimum password length in 6 characters"]
    },
}, {timestamps:true});


//fire a function after doc saved into db

AuthSchema.pre('save', async function (next) {
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password,salt);
    next();
});

AuthSchema.post('save', function (doc , next) {
    console.log("The new user has been created", doc);
    next();
});


//login static method

AuthSchema.statics.login = async function (email,password) {
    const user = await this.findOne({email});
    if(user)
    {
      const auth = await bycrypt.compare(password,user.password);
      if(auth)
      {
        return user;
      }

      throw Error('Incorrect Password')
    }
    
    throw Error('Incorrect Email');
}

const Auth = mongoose.model('user',AuthSchema);
module.exports = Auth;