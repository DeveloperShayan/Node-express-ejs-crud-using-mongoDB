const Blog = require('../models/blog');

const blog_index = (req,res)=>{
    Blog.find()
    .sort({createdAt : -1})
    .then((result)=>{
       res.render('index',{title:'home',blogs : result});
    })
    .catch((err)=>{
       console.log(err);
    });

}

const single_blog = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
       res.render('blogs/single-blog',{blog : result, title: 'Single BLog'});
    })
    .catch((err)=>{
       console.log(err);
    })
 }

const get_create_blog = (req,res)=>{
    res.render('blogs/create',{title:'Add Blog'});
}

const add_blog = (req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
       res.redirect('/');
    })
    .catch((err)=>{
       console.log(err)
    });
 }

const get_blog_update =  (req,res)=>{
   const id = req.params.id;
   Blog.findById(id)
   .then((result)=>{
      res.render('blogs/edit-blog',{blog : result, title: 'Update BLog'});
   })
   .catch((err)=>{
      console.log(err);
   })
}

const update_blog = (req, res) => {
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, (error)=> {
     if(error) {
       res.redirect('/')
     }else{
       res.redirect('/')
     }
   })
 }

const delete_blog = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
       res.json({redirect : '/'})
    })
    .catch((err)=>{
       console.log(err);
    })
 }

module.exports = {
    blog_index,
    single_blog,
    get_create_blog,
    add_blog,
    get_blog_update,
    update_blog,
    delete_blog
}