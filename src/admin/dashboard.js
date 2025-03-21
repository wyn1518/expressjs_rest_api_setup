
const asyncHandler = require("express-async-handler");
module.exports = asyncHandler(async function(req,res){
    
    console.log("From request.session");
    console.log(req.session)
    console.log(req.session.id)


    
    res.render('index');
})