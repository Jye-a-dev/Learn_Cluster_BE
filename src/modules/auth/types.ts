import type { Request, Response } from "express";
export declare const AuthController: {
    googleConfig(_req: Request, res: Response): Response<any, Record<string, any>>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    googleLogin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    me(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=types.ts.map