const User = require("../api/users/users.model");
const { verifyJwt } = require("../utils/jwt");

const getTokenFromHeader = (req) => {
    const auth = req.headers.authorization;
    if (!auth || typeof auth !== "string") return null;

    // Aceptamos: "Bearer <token>" (con o sin mayúsculas)
    const parts = auth.split(" ");
    if (parts.length !== 2) return null;

    const [type, token] = parts;
    if (type.toLowerCase() !== "bearer" || !token) return null;

    return token;
};

const isAuth = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        let validToken;
        try {
            validToken = verifyJwt(token);
        } catch (err) {
            console.error("[isAuth] Invalid token:", err?.message || err);
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const userLogged = await User.findById(validToken.id).select("-password");
        if (!userLogged) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        req.user = userLogged;
        return next();
    } catch (error) {
        console.error("[isAuth] ERROR:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        let validToken;
        try {
            validToken = verifyJwt(token);
        } catch (err) {
            console.error("[isAdmin] Invalid token:", err?.message || err);
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const userLogged = await User.findById(validToken.id).select("-password");
        if (!userLogged) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        if (userLogged.rol !== "admin") {
            return res.status(403).json({ msg: "Forbidden" });
        }

        req.user = userLogged;
        return next();
    } catch (error) {
        console.error("[isAdmin] ERROR:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    isAuth,
    isAdmin,
};
