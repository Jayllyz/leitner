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
  query: {
    tags: {
      description: "Tags to filter the cards",
      schema: z.array(z.string()),
    },
  },
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

export const getQuizzRoute = createRoute({
  method: "get",
  path: "/cards/quizz",
  request: {
    query: z.object({
      date: z
        .string()
        .date()
        .optional()
        .describe(
          "Date of quizz. If not provided, date will be today. Example : 2023-11-03",
        ),
    }),
  },
  summary: "Cards of the day",
  description:
    "Used to fetch all cards for a quizz at a given date. If no date is provided, quizz will be for today.",
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: z.array(CardDTO),
        },
      },
    },
    400: badRequestSchema,
  },
  tags: ["Learning"],
});
