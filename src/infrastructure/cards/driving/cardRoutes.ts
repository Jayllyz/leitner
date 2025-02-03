import { CardDTO } from "@/infrastructure/DTO/Card/CardDTO";
import { CardUserDataDTO } from "@/infrastructure/DTO/Card/CardUserDataDTO";
import { badRequestSchema } from "@/infrastructure/DTO/badRequestSchema";
import { createRoute } from "@hono/zod-openapi";

export const createCardRoute = createRoute({
  method: "post",
  path: "/cards",
  summary: "Create a card",
  description: "Create a card",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CardUserDataDTO,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: CardDTO,
        },
      },
    },
    400: badRequestSchema,
  },
  tags: ["Cards"],
});
