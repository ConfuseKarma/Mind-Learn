// middleware/validate.js
export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: "Invalid payload",
                details: result.error.flatten(),
            });
        }
        req.validated = result.data;
        next();
    };
}
