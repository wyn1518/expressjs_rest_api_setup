
const { authController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

const router = module.exports = require('express').Router()

router.post('/signup', authMiddleware.isNotAuthenticated, authController.signUp);
router.get('/signup', authMiddleware.isNotAuthenticated, authController.signUp)

router.post('/signin',authMiddleware.isNotAuthenticated, authController.signIn );
router.get('/signin',authMiddleware.isNotAuthenticated, authController.signIn)

router.get('/signout',authController.signOut );

const profileController = authController.profile();

router.get('/profile', authMiddleware.isAuthenticated, profileController.index);
router.post('/profile/update/basic-information', authMiddleware.isAuthenticated, profileController.updateBasicInformation);
router.post('/profile/update/email', authMiddleware.isAuthenticated, profileController.updateEmail);