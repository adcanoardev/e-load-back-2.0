/**
 * Middleware centralizado de errores.
 * Captura cualquier error lanzado con next(err) en toda la app.
 */
const errorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // En desarrollo mostramos el stack trace
    const response = {
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    // Errores de validación de Mongoose
    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: "Validation Error",
            details: Object.values(err.errors).map((e) => e.message),
        });
    }

    // ID de Mongo inválido
    if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // Duplicado (unique constraint)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({ error: `${field} already exists` });
    }

    console.error(`[${new Date().toISOString()}] ${status} - ${message}`);
    return res.status(status).json(response);
};

module.exports = { errorHandler };
