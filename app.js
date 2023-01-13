const express = require('express');
const morgan = require('morgan');
const mangoose = require('mongoose');
const BlogRoutes = require('./routes/BlogRoutes')
const WebRoutes = require('./routes/web')
const methodOverride = require('method-override');

const app = express();

//connect to mangoDB
const dbURI = 'mongodb+srv://jibran_ali:jibran12345@nodetuts.ltjedos.mongodb.net/node-tuts?retryWrites=true&w=majority';
mangoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>console.log('Connected to database'))
.catch((err)=>console.log(err));


app.set('view engine','ejs');
app.listen(3000);

//middleware with static files
app.use(express.static('public'));
app.use((express.urlencoded({extended : true})));
app.use(methodOverride('_method'))

//3rd Party Middleware
app.use(morgan('dev'));



//Blog Routes
app.use(BlogRoutes);

//Web Routes
app.use(WebRoutes);

