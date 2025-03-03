const UserHandler = require('./user.handler');
const AuthValidation = require('./auth.validation')
const AuthMiddleware = require('./auth.middleware');
const router = module.exports = require('express').Router()

router.get('/test',UserHandler.test);
router.post('/account/signup', AuthValidation.signUp, UserHandler.signUp);
router.post('/account/signin', AuthValidation.signIn, UserHandler.signIn);


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