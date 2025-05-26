
const asyncHandler = require('express-async-handler');

const home = function(req,res){
    res.render('index.html')
}



module.exports = {home}