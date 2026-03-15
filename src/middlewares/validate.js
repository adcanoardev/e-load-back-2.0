const { z } = require("zod");

/**
 * Factory que devuelve un middleware validador para el schema Zod dado.
 * Uso: router.post("/", validate(mySchema), controller)
 */
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: "Validation Error",
            details: result.error.flatten().fieldErrors,
        });
    }
    req.body = result.data; // datos ya parseados y limpios
    next();
};

// ─── Schemas ───────────────────────────────────────────────────────────────────

const schemas = {
    createUser: z.object({
        username: z.string().min(3).max(30).trim(),
        name: z.string().min(2).trim(),
        surnames: z.string().min(2).trim(),
        email: z.string().email().trim(),
        password: z.string().min(6),
    }),

    updateUser: z.object({
        username: z.string().min(3).max(30).trim().optional(),
        name: z.string().min(2).trim().optional(),
        surnames: z.string().min(2).trim().optional(),
        email: z.string().email().trim().optional(),
        password: z.string().min(6).optional(),
    }),

    login: z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
    }),

    createStation: z.object({
        coordinatesLat: z.number({ coerce: true }),
        coordinatesLng: z.number({ coerce: true }),
        address: z.string().min(5).trim(),
        schedule: z.enum(["10:00 - 22:00", "24 Horas", "Cerrada"]),
    }),

    updateStation: z.object({
        address: z.string().min(5).trim().optional(),
        schedule: z.enum(["10:00 - 22:00", "24 Horas", "Cerrada"]).optional(),
        likes: z.number({ coerce: true }).int().min(0).optional(),
    }),

    createSpot: z.object({
        power: z.enum(["2.3 kW", "3.7 kW", "7.4 kW", "11 kW", "22 kW", "43 kW", "50 kW"]),
        type: z.enum(["CHAdeMO", "CCS2", "Type2", "Schuko"]),
        rate: z.string().min(1),
        station: z.string().length(24, "Invalid station ID"),
        state: z.enum(["Libre", "Ocupado", "Fuera de Servicio"]).optional(),
    }),

    updateSpotState: z.object({
        state: z.enum(["Libre", "Ocupado", "Fuera de Servicio"]),
    }),

    createComment: z.object({
        body: z.string().min(1, "Comment cannot be empty").max(500).trim(),
        station: z.string().length(24, "Invalid station ID"),
    }),

    createPayment: z.object({
        cardHolderName: z.string().min(2).trim(),
        number: z.string().length(16, "Card number must be 16 digits").regex(/^\d+$/, "Only digits"),
        valMonth: z.string().length(2).regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
        valYear: z.string().length(2).regex(/^\d{2}$/, "Invalid year"),
    }),
};

module.exports = { validate, schemas };
