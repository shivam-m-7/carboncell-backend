const jwt = require('jsonwebtoken')

const authValidation = (req, res, next) => {
    if(!req.headers['authorization']){
        console.log(req.headers)
        return res.status(403).json({message: 'error', error:'Token is requried'})
    }
    
    try{        
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET)
        //add user from payload to request
        req.user=decoded;
        next();
    }catch(err){
        console.log(err)
        return res.status(403).json({message: 'error', error: "Token is not valid or it's expired"})
    }
}

module.exports = {
    authValidation,
}