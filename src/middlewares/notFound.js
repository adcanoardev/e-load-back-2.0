const notFound = (req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
};

module.exports = { notFound };
