import { z } from "@hono/zod-openapi";

export const CardDTO = z.object({
  id: z.coerce.number().min(0),
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
  question: z.string().max(500),
  answer: z.string().max(500),
  tag: z.string().max(128).optional(),
});

export type CardDTO = z.infer<typeof CardDTO>;
