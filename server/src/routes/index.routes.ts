import { Router } from "express";
import { routesConfig } from "./routes.config.js";
import path from "path";
import { pathToFileURL } from "url";

const router = Router();
const routeList: string[] = [];

const routesPath = path.join(process.cwd(), "src", "routes");

function extractRoutes(router: any, prefix: string) {
	const routes: { methods: string; path: string }[] = [];

	router.stack?.forEach((layer: any) => {
		if (layer.route && layer.route.path) {
			const methods = Object.keys(layer.route.methods)
				.map((m) => m.toUpperCase())
				.join(", ");

			routes.push({
				methods,
				path: prefix + layer.route.path,
			});
		}
	});

	return routes;
}

async function loadRoutes() {
	for (const r of routesConfig) {
		const routeName = r.name;
		routeList.push(routeName);

		try {
			const fullPath = path.join(routesPath, r.file);

			console.log("📥 Importing", fullPath);
			const module = await import(pathToFileURL(fullPath).href + `?t=${Date.now()}`);

			const apiRouter = module.default;
			if (!apiRouter?.stack) {
				console.log(`⚠ ${routeName} không phải router`);
				continue;
			}

			if (routeName === "auth") {
				router.get("/api/auth/html", (req, res) => {
					res.redirect("/api/user/html");
				});

				router.use(`/api/${routeName}`, apiRouter);

				console.log(`✔ Mounted /api/${routeName} (redirect HTML)`);
				continue;
			}

			router.get(`/api/${routeName}/html`, async (req, res) => {
				try {
					const response = await fetch(`http://localhost:3000/api/${routeName}`);
					const data = await response.json();

					const columns = Array.isArray(data) && data.length ? Object.keys(data[0]) : [];

					const apiRoutes = extractRoutes(apiRouter, `/api/${routeName}`);

					res.render("data", {
						title: routeName.toUpperCase(),
						columns,
						data: Array.isArray(data) ? data : [],
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

			router.use(`/api/${routeName}`, apiRouter);

			console.log(`✔ Mounted /api/${routeName}`);
		} catch (err) {
			console.error(`❌ Error loading ${routeName}`, err);
		}
	}
}

await loadRoutes();

router.get("/", (req, res) => {
	res.render("index", { routes: routeList });
});

export default router;
