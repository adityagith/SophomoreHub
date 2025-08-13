function authMiddleware(req,res,next){
    console.log(5);
    next();
}

module.exports = authMiddleware;