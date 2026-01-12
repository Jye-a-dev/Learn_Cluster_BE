import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../interfaces/response.interface.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err);

	const resData: ApiResponse<null> = {
		success: false,
		error: err.message || "Internal Server Error",
	};

	res.status(err.status || 500).json(resData);
};
