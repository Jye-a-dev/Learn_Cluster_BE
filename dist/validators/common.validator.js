// ===== REUSABLE VALIDATION FUNCTION =====
export function validateSchema(schema, data) {
    const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        throw new Error(error.details.map((d) => d.message).join(", "));
    }
    return value;
}
