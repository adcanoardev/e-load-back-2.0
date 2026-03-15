const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        cardHolderName: { type: String, required: true, trim: true },
        // Se guarda solo los últimos 4 dígitos por seguridad
        lastFour: { type: String, required: true, length: 4 },
        valMonth: { type: String, required: true, match: /^(0[1-9]|1[0-2])$/ },
        valYear: { type: String, required: true, match: /^\d{2}$/ },
    },
    {
        timestamps: true,
        collection: "payments",
    }
);

const Payment = mongoose.model("payments", paymentSchema);
module.exports = Payment;
