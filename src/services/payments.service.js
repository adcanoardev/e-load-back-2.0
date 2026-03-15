const Payment = require("../models/Payment");
const User = require("../models/User");

const create = async (body, userId) => {
    // Solo guardar últimos 4 dígitos — nunca el número completo
    const lastFour = body.number.slice(-4);
    const payment = new Payment({
        cardHolderName: body.cardHolderName,
        lastFour,
        valMonth: body.valMonth,
        valYear: body.valYear,
    });
    await payment.save();
    await User.findByIdAndUpdate(userId, { $push: { payments: payment._id } });
    return payment;
};

const remove = async (id, userId) => {
    const payment = await Payment.findById(id);
    if (!payment) {
        const err = new Error("Payment not found");
        err.status = 404;
        throw err;
    }
    await User.findByIdAndUpdate(userId, { $pull: { payments: payment._id } });
    return Payment.findByIdAndDelete(id);
};

const getByUser = async (userId) => {
    const user = await User.findById(userId).populate("payments");
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    return user.payments;
};

module.exports = { create, remove, getByUser };
