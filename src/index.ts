import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import type { CardRepository } from "./domain/cards/CardRepository";
import { CardService } from "./domain/cards/CardService";
import type { ManageCard } from "./domain/cards/ManageCard";
import type { ManageQuizz } from "./domain/quizz/ManageQuizz";
import { QuizzService } from "./domain/quizz/QuizzService";
import { FakeCardRepositoryAdapter } from "./infrastructure/cards/driven/FakeCardRepositoryAdapter";
import { CardControllerAdapter } from "./infrastructure/cards/driving/CardControllerAdapter";

const app = new OpenAPIHono();

app.use(
  "*",
  prettyJSON(),
  secureHeaders(),
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);
app.get("/", (c) => c.text("Welcome to the API!"));

app.route("/", getCardController().cardApiHandler);

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
  openapi: "3.1.0",
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

function getCardController(): CardControllerAdapter {
  const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
  const cardManager: ManageCard = new CardService(cardRepository);
  const quizzManager: ManageQuizz = new QuizzService(cardRepository);
  const cardControllerAdapter = new CardControllerAdapter(
    cardManager,
    quizzManager,
  );
  return cardControllerAdapter;
}
