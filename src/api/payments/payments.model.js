const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        cardHolderName: {type: String, required: true},
        number: {type: String, unique: true, required: true, max:16},
        valMonth: {type: String, required: true, max:2},
        valYear: {type: String, required: true, max:2}
    },
    {
        timestamps: true,
        collection: 'payments'
    }
)
paymentSchema.pre('save', function(next) {
    if(this.number.length === 16 || this.valMonth.length === 2 || this.valYear.length === 2){
        next();
    }
})

const Payment = mongoose.model('payments', paymentSchema);
module.exports = Payment;