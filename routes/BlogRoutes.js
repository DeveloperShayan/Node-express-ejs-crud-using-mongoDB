const express = require('express');
const BlogController = require('../controllers/BlogController')
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
 
   router.get('/',requireAuth,BlogController.blog_index);
   
   router.get('/single-blog/:id',requireAuth,BlogController.single_blog);

   router.get('/blogs/create',requireAuth,BlogController.get_create_blog);
   
   router.post('/add-blog',requireAuth,BlogController.add_blog);

   router.get('/edit-blog/:id',requireAuth,BlogController.get_blog_update);
   router.put('/update-blog/:id',requireAuth,BlogController.update_blog);
  
   router.delete('/delete-blog/:id',requireAuth,BlogController.delete_blog);
   
   
 module.exports = router;