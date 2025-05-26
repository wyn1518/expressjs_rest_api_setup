const router = module.exports = require('express').Router()
const { authMiddleware } = require('../middlewares')

router.get('/admin', function(req,res){
    res.render('admin/index.html',{});
});




router.use('/admin/*',function(req,res){
    res.status(404).render('admin/index.html',{content:'../ui/404.html'});
})