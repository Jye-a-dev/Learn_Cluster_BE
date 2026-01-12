import { Router } from "express";
import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

const router = Router();
const routesPath = path.resolve("./src/routes");
const routeList: string[] = [];

// Hàm lấy danh sách route từ router
function extractRoutes(r: any, prefix: string) {
	const result: { methods: string; path: string }[] = [];
	r.stack?.forEach((layer: any) => {
		if (layer.route) {
			const methods = Object.keys(layer.route.methods)
				.map((m) => m.toUpperCase())
				.join(", ");
			result.push({
				methods,
				path: prefix + layer.route.path,
			});
		}
	});
	return result;
}

// Đọc tất cả file trong routes
fs.readdirSync(routesPath).forEach((file) => {
	if (file === "index.routes.ts") return;
	if (!file.endsWith(".ts") && !file.endsWith(".js")) return;

	const routeName = file.replace(/\.(ts|js)$/, "").replace(".routes", "");
	routeList.push(routeName);

	const fullPath = path.join(routesPath, file);

	import(pathToFileURL(fullPath).href)
		.then((module) => {
			const apiRouter = module.default?.default || module.default;
			if (!apiRouter?.stack) return;

			// Redirect auth HTML sang user HTML
			if (routeName === "auth") {
				router.get("/api/auth/html", (req, res) => {
					res.redirect("/api/user/html");
				});
				// Không mount HTML khác cho auth
				router.use(`/api/${routeName}`, apiRouter);
				console.log(`✔ /api/${routeName} → ${file} (redirect HTML to /api/user/html)`);
				return;
			}

			// Mount HTML route trước cho các route dạng bảng
			router.get(`/api/${routeName}/html`, async (req, res) => {
				try {
					const response = await fetch(`http://localhost:3000/api/${routeName}`);
					const data = await response.json();
					const columns = Array.isArray(data) && data.length ? Object.keys(data[0]) : [];
					const apiRoutes = extractRoutes(apiRouter, `/api/${routeName}`);

					res.render("data", {
						title: routeName.toUpperCase(),
						columns,
						data: Array.isArray(data) ? data : [], // chắc chắn là array
						apiRoutes,
					});
				} catch {
					res.render("data", {
						title: routeName.toUpperCase(),
						columns: [],
						data: [],
						apiRoutes: [],
					});
				}
			});

			// Mount API JSON bình thường
			router.use(`/api/${routeName}`, apiRouter);

			console.log(`✔ /api/${routeName} → ${file}`);
		})
		.catch(console.error);
});

// Trang index hiển thị danh sách route
router.get("/", (req, res) => {
	res.render("index", { routes: routeList });
});

export default router;
