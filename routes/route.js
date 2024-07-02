
const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/multer')
const validUser = require('../middleware/validateTokenHandler')

const { getAllCategory,createCategory, updateCategory, deleteCategory } = require('../Controllers/category');
const { getAllBlogs,addBlogs,updateBlog,deleteBlog} = require('../Controllers/blog');
const { adminCreate ,loginUser} = require('../Controllers/Auth');

/// Auth Apis
router.post('/auth/login',loginUser)
router.post('/auth/register',validUser.validateToken,adminCreate)
//// Category Apis
router.post('/api/addCategory',validUser.validateToken,createCategory)
router.put('/api/updateCategory',validUser.validateToken,updateCategory)
router.put('/api/deleteCategory',validUser.validateToken,deleteCategory)
router.get('/api/getAllCategory',validUser.validateToken,getAllCategory)    
//// Blog Apis
router.post('/api/addBlogs', fileUpload.singleFileUpload,validUser.validateToken,addBlogs)
router.put('/api/updateBlog',fileUpload.singleFileUpload,validUser.validateToken,updateBlog)
router.put('/api/deleteBlog',validUser.validateToken,deleteBlog)
router.get('/api/getAllBlogs',getAllBlogs)

module.exports = router;