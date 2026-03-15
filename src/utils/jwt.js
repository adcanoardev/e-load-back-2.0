const jwt = require("jsonwebtoken");

/**
 * Genera un JWT firmado con el id y username del usuario.
 * @param {string} id - MongoDB ObjectId del usuario
 * @param {string} username
 * @returns {string} token JWT
 */
const generateSign = (id, username) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { generateSign };
