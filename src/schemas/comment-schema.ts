import { z } from "zod";

export const commentSchema = z.object({
  message: z.string(),
});
