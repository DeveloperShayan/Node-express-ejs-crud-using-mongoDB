const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
router.get('/about', requireAuth,(req,res)=>{
    res.render('about',{title:'About'});
 });

 router.use((req,res)=>{
   res.status(404).render('404');
 });

 
 module.exports = router;