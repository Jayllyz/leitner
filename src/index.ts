import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";

const app = new OpenAPIHono();

app.use("*", prettyJSON(), secureHeaders(), cors());
app.get("/", (c) => c.text("Welcome to the API!"));

const healthCheck = createRoute({
  method: "get",
  path: "/health",
  summary: "Health check",
  description: "Health check",
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: z.string(),
        },
      },
    },
  },
  tags: ["health"],
});
app.openapi(healthCheck, (c) => c.json("OK", 200));

app.doc("/doc", (c: Context) => ({
  openapi: "3.3.0",
  info: {
    version: "1.0.0",
    title: "API",
  },
  servers: [
    {
      url: new URL(c.req.url).origin,
      description: "Current environment",
    },
  ],
}));

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
