const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true },
        surnames: { type: String, required: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        image: { type: String },
        password: { type: String, required: true },
        points: { type: Number, default: 0 },
        rol: { type: String, default: "user", enum: ["admin", "user"] },
        status: { type: String, default: "unverified", enum: ["verified", "unverified"] },
        payments: [{ type: mongoose.Types.ObjectId, ref: "payments" }],
        spots: [
            {
                date: { type: String, required: true },
                spot: { type: mongoose.Types.ObjectId, ref: "spots" },
                station: { type: mongoose.Types.ObjectId, ref: "stations" },
            },
        ],
    },
    {
        timestamps: true,
        collection: "users",
    }
);

// Hash de contraseña solo cuando se modifica
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// No exponer la contraseña en las respuestas JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model("users", userSchema);
module.exports = User;
