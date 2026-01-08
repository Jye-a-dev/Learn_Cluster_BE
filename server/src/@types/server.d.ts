// src/@types/server.d.ts

// Thêm khai báo cho module route ESM
declare module "*.routes" {
	import { Router } from "express";
	const router: Router;
	export default router;
}

// Nếu bạn dùng các file JS mà TS không có type
declare module "*.js";
declare module "*.json";

// Tạm thời bỏ qua các import chưa type
declare module "*";
