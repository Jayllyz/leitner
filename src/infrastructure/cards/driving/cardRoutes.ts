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
  request: {
    query: z.object({
      tags: z
        .string()
        .or(z.array(z.string()))
        .optional()
        .transform((val) => (typeof val === "string" ? [val] : val))
        .describe(
          "Tags of cards to find. If not present, all cards will be found. Example : tag1,tag2",
        ),
    }),
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

export const answerCard = createRoute({
  method: "patch",
  path: "/cards/{cardId}/answer",
  request: {
    params: z.object({
      cardId: z.string().describe("Id of answered card."),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            isValid: z.boolean(),
          }),
        },
      },
    },
  },
  summary: "Answer a card",
  description:
    "Used to answer a question. Body indicate if user has answered correctly or not.",
  responses: {
    204: {
      description: "Successful response",
    },
    400: badRequestSchema,
    404: {
      description: "Card not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});
