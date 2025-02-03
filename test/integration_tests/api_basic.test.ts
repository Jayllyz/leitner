import { describe, expect, it } from "bun:test";
import app from "@/index";

describe("API Tests", () => {
  it("should return 'Welcome to the API!' on GET /", async () => {
    const req = new Request("http://localhost/", { method: "GET" });
    const res = await app.request(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe("Welcome to the API!");
  });

  it("should return 'OK' on GET /health", async () => {
    const req = new Request("http://localhost/health", { method: "GET" });
    const res = await app.request(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toBe("OK");
  });

  it("should return OpenAPI doc on GET /doc", async () => {
    const req = new Request("http://localhost/doc", { method: "GET" });
    const res = await app.request(req);

    expect(res.status).toBe(200);
    const json = await res.json();

    expect(json.openapi).toBe("3.1.0");
    expect(json.info.title).toBe("API");
    expect(json.servers[0].description).toBe("Current environment");
  });

  it("should serve Swagger UI on GET /ui", async () => {
    const req = new Request("http://localhost/ui", { method: "GET" });
    const res = await app.request(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    const body = await res.text();
    expect(body).toContain("SwaggerUI");
  });
});
