const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true, trim: true},
        name: {type: String, required: true},
        surnames: {type: String, required: true},
        email: {type: String, required: true, unique: true, trim: true},
        image: {type: String},
        password: {type: String, required: true, trim: true},
        points: {type: Number, default: 0},
        rol: {type: String, default: "user", enum: ["admin", "user"]},
        status: {type: String, default: 'unverified'},  //Pdte crear verificación
        payments: [{type: mongoose.Types.ObjectId, ref: 'payments'}],
        spots: [{
            date: {type: String, required: true},
            spot: { type: mongoose.Types.ObjectId, ref: 'spots'},
            station: {type: mongoose.Types.ObjectId, ref: 'stations'}
        }] 
    },
    {
        timestamps: true,
        collection: 'users'
    }
)
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model('users', userSchema);
module.exports = User;