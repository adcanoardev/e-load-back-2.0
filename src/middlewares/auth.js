const User = require("../api/users/users.model")
const { verifyJwt } = require("../utils/jwt")

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({msg: 'Unauthorized'});
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLoged = await User.findById(validToken.id);
        userLoged.password = null;
        req.user = userLoged;
        next();
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({msg: 'Unauthorized'});
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLogged = await User.findById(validToken.id);
        if(userLogged.rol === "admin"){
            userLogged.password = null;
            req.user = userLogged;
            next();
        }
        else{
            return res.status(403).json({msg: 'Forbbiden'});
        }
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
module.exports = {
    isAuth,
    isAdmin
}