import { z } from "@hono/zod-openapi";

export const badRequestSchema = {
  description: "Bad request",
  content: {
    "application/json": {
      schema: z.object({
        error: z.string(),
      }),
    },
  },
};
