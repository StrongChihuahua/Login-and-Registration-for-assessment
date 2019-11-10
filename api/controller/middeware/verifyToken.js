
module.exports = verifyToken = (req, res, next) => {
    const token = req.headers['auth-token']
    if(!token){
        res.status(403).json({
            msg: 'Forbidden. Authorization Denied!'
        })
    } else {
        req.token = token;
        next();
    }
}
