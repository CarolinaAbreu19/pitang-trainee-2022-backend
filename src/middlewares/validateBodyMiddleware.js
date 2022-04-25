const validateBodyMiddleware = (appointmentSchema) => async (req, res, next) => {
    const body = req.body;

    try {
        await appointmentSchema.validate(body);
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message , error_path: error.path });
    }
}

export default validateBodyMiddleware;