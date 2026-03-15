const paymentsService = require("../services/payments.service");

const createPayment = async (req, res, next) => {
    try {
        const payment = await paymentsService.create(req.body, req.user._id);
        return res.status(201).json(payment);
    } catch (err) { next(err); }
};

const deletePayment = async (req, res, next) => {
    try {
        const payment = await paymentsService.remove(req.params.id, req.user._id);
        return res.status(200).json(payment);
    } catch (err) { next(err); }
};

const getAllPaymentsByUser = async (req, res, next) => {
    try {
        const payments = await paymentsService.getByUser(req.params.id);
        return res.status(200).json(payments);
    } catch (err) { next(err); }
};

module.exports = { createPayment, deletePayment, getAllPaymentsByUser };
