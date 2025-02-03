import { z } from "@hono/zod-openapi";

export const CardDTO = z.object({
  id: z.string(),
  category: z.enum([
    "FIRST",
    "SECOND",
    "THIRD",
    "FOURTH",
    "FIFTH",
    "SIXTH",
    "SEVENTH",
    "DONE",
  ]),
  question: z.string(),
  answer: z.string(),
  tag: z.string().optional(),
});

export type CardDTO = z.infer<typeof CardDTO>;
