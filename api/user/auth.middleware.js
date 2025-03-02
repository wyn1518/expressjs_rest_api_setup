const  jwt = require('jsonwebtoken');
const {StatusCodes,ReasonPhrases} = require('http-status-codes')

module.exports = {
    checkToken:function(req,res,next){
        const token = req.cookies.token;
        let isTokenValid = true;
        if (token === null) {
            isTokenValid = false;
        }else{
            
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    isTokenValid = false;
                }
                console.log(decoded);
                // return res.status(StatusCodes.OK).json({msg:ReasonPhrases.OK,user:decoded});
            });
        }

        if(!isTokenValid) return res.status(StatusCodes.UNAUTHORIZED).json({msg:ReasonPhrases.UNAUTHORIZED});


        next();
    }
};