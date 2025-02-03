import { CardDTO } from "@/infrastructure/DTO/Card/CardDTO";
import { CardUserDataDTO } from "@/infrastructure/DTO/Card/CardUserDataDTO";
import { badRequestSchema } from "@/infrastructure/DTO/badRequestSchema";
import { createRoute, z } from "@hono/zod-openapi";

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

export const getAllCardsRoute = createRoute({
  method: "get",
  path: "/cards",
  summary: "Get all cards",
  description:
    "Used to fetch every cards with given tags. If no tags are provided, will fetch all cards.",
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: z.array(CardDTO),
        },
      },
    },
  },
  tags: ["Cards"],
});
