const express = require('express');
const BlogController = require('../controllers/BlogController')
const router = express.Router();

 
   router.get('/',BlogController.blog_index);
   
   router.get('/single-blog/:id',BlogController.single_blog);

   router.get('/blogs/create',BlogController.get_create_blog);
   
   router.post('/add-blog',BlogController.add_blog);

   router.get('/edit-blog/:id',BlogController.get_blog_update);
   router.put('/update-blog/:id',BlogController.update_blog);
  
   router.delete('/delete-blog/:id',BlogController.delete_blog);
   
 module.exports = router;