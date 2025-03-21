const authController = require('./auth.controller')
const authMiddlware = require('./auth.middleware')
const authValidation= require('./auth.validation')

const router = module.exports = require('express').Router()

router.post('/signup', authMiddlware.ifNotSignin, authValidation.signUp, authController.signUp);
router.get('/signup', authMiddlware.ifNotSignin, authController.signUp)

router.post('/signin',authMiddlware.ifNotSignin, authValidation.signIn, authController.signIn );
router.get('/signin',authMiddlware.ifNotSignin, authController.signIn)

router.get('/signout',authController.signOut );

module.exports = router;