import { z } from "@hono/zod-openapi";

export const CardUserDataDTO = z.object({
  question: z.string().max(500),
  answer: z.string().max(500),
  tag: z.string().max(128).optional(),
});

export type CardUserDataDTO = z.infer<typeof CardUserDataDTO>;
