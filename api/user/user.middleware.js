const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const middleware = module.exports = {}

middleware.isEmailValid =


middleware.signInValidator = [
    body('email')
        .trim()
        .notEmpty().withMessage('email is empty')
        .isEmail().withMessage('Invalid email.'),
    body('password')
        .trim()
        .notEmpty().withMessage('password is empty'),


    function(req,res,next){
        const result = validationResult(req);
        if (!result.isEmpty()) {
            result.msg="Validation errors in your request";
            return res.status(400).json(result);
        }
        next();
    }
] 

middleware.signUpValidator = [
   
];



