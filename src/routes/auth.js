const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const router = module.exports = require('express').Router()


router.get('/test',UserHandler.test);
router.post('/signup', AuthMiddleware.signUp, AuthController.signUp);
router.post('/signin', AuthMiddleware.signIn, AuthController.signIn);


// router.get('/set-session',function(req,res){
//     req.session.visited = true;
//     res.status(200).send("session set");
// });

// router.get('/get-session',function(req,res){
//     res.status(200).json({
//         server:req.session,
//         id:req.session.id,
//         sessionId:req.sessionID
//     });
// });

// router.get('/set-cookie',function(req,res){
//     res.cookie('test','hellworld',{ maxAge:60000 , signed:true });
//     res.status(200).send('Cookie has been set');
// });

// router.get('/get-cookie',function(req,res){
//     res.status(200).send(req.cookies);
// })



module.exports = router;