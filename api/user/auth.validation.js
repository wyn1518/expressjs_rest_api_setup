const {StatusCodes,ReasonPhrases} = require('http-status-codes')
const { body } = require('express-validator');
const {getValidationResult} = require('../utils/validation.middleware');



const isEmail =  body('email')
    .trim()
    .notEmpty().withMessage('Email is empty.')
    .isEmail().withMessage('Invalid email.')

const isPasswordStrong = body('password')
    .isStrongPassword().withMessage('Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.');
        

module.exports = {

    signUp:[
        isEmail,
        body('displayname')
            .trim()
            .notEmpty().withMessage('username is empty.'),

        body('firstname')
            .trim()
            .notEmpty().withMessage('firstname is empty.'),

        body('lastname')
            .trim()
            .notEmpty().withMessage('lastname is empty.'),
        isPasswordStrong,
        
        body('repeatPassword')
            .custom((value, { req }) => value === req.body.password).withMessage('password don\'t match'),
        getValidationResult
    ],
    signIn:[
        isEmail,
        body('password').notEmpty(),
        getValidationResult
    ]
}