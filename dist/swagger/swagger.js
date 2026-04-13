import swaggerUi from "swagger-ui-express";
import { extractRoutes, routeList } from "../routes/route-registry.js";
const METHOD_LABELS = {
    get: "Get",
    post: "Create",
    put: "Replace",
    patch: "Update",
    delete: "Delete",
    options: "Options",
    head: "Head",
};
function toTitleCase(value) {
    return value
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}
function toOpenApiPath(path) {
    return path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
}
function extractPathParameters(path) {
    const matches = [...path.matchAll(/:([A-Za-z0-9_]+)/g)];
    return matches.map((match) => ({
        name: match[1],
        in: "path",
        required: true,
        schema: { type: "string" },
        description: `Path parameter: ${match[1]}`,
    }));
}
function needsAuth(path) {
    const publicAuthRoutes = new Set([
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/google",
        "/api/auth/logout",
        "/",
        "/api/openapi.json",
        "/api/docs",
    ]);
    return !publicAuthRoutes.has(path);
}
function buildResponses(method, path) {
    const successStatus = method === "post" && (path === "/api/auth/register" || !path.startsWith("/api/auth/"))
        ? "201"
        : "200";
    return {
        [successStatus]: {
            description: "Successful response",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        additionalProperties: true,
                    },
                },
            },
        },
        400: { description: "Validation or bad request error" },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
    };
}
function buildOperation(moduleName, path, method) {
    const parameters = extractPathParameters(path);
    return {
        tags: [toTitleCase(moduleName)],
        summary: `${METHOD_LABELS[method]} ${toTitleCase(moduleName)}`,
        description: `${METHOD_LABELS[method]} endpoint for ${toTitleCase(moduleName)}.`,
        parameters,
        security: needsAuth(path)
            ? [{ cookieAuth: [] }, { bearerAuth: [] }]
            : [],
        responses: buildResponses(method, path),
    };
}
export function buildOpenApiSpec() {
    const paths = {
        "/": {
            get: {
                tags: ["System"],
                summary: "API index",
                description: "Returns all registered modules and API routes.",
                parameters: [],
                security: [],
                responses: {
                    200: { description: "API index response" },
                },
            },
        },
    };
    for (const route of routeList) {
        const prefix = `/api/${route.name}`;
        const entries = extractRoutes(route.router, prefix);
        for (const entry of entries) {
            const openApiPath = toOpenApiPath(entry.path);
            const pathItem = (paths[openApiPath] ??= {});
            for (const methodName of entry.methods) {
                const method = methodName.toLowerCase();
                pathItem[method] = buildOperation(route.name, entry.path, method);
            }
        }
    }
    return {
        openapi: "3.0.3",
        info: {
            title: "LearnCluster API",
            version: "1.0.0",
            description: "LearnCluster is positioned as a learning ecosystem that combines LMS operations, knowledge-graph-guided progression, study matching and AI feedback workflows.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            },
        ],
        tags: routeList.map((route) => ({
            name: toTitleCase(route.name),
            description: `${route.description} Layer: ${route.layer}.`,
        })),
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "access_token",
                },
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        paths,
    };
}
export function registerSwagger(app) {
    const spec = buildOpenApiSpec();
    app.get("/api/openapi.json", (_req, res) => {
        res.json(spec);
    });
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec, {
        explorer: true,
        customSiteTitle: "LearnCluster Swagger",
    }));
}
