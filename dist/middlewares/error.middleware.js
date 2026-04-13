export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const resData = {
        success: false,
        error: err.message || "Internal Server Error",
    };
    res.status(err.status || 500).json(resData);
};
