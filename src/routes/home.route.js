
const { homeController } = require('../controllers')

const router = module.exports = require('express').Router()

router.get('/', homeController.home);