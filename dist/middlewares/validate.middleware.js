const validate = (schema, source) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({
                message: "Validation thất bại",
                details: error.details,
            });
        }
        if (source === "body") {
            req.body = value;
            req.validatedBody = value;
        }
        if (source === "params") {
            Object.assign(req.params, value);
            req.validatedParams = value;
        }
        if (source === "query") {
            Object.assign(req.query, value);
            req.validatedQuery = value;
        }
        next();
    };
};
export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
export const validateQuery = (schema) => validate(schema, "query");
export const validateParamsAndQuery = (paramsSchema, querySchema) => (req, res, next) => {
    const paramsResult = paramsSchema.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (paramsResult.error) {
        return res.status(400).json({
            message: "Validation params thất bại",
            details: paramsResult.error.details,
        });
    }
    const queryResult = querySchema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (queryResult.error) {
        return res.status(400).json({
            message: "Validation query thất bại",
            details: queryResult.error.details,
        });
    }
    Object.assign(req.params, paramsResult.value);
    Object.assign(req.query, queryResult.value);
    req.validatedParams = paramsResult.value;
    req.validatedQuery = queryResult.value;
    next();
};
