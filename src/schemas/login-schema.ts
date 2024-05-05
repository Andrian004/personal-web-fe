import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(25, { message: "To much characters" }),
  password: z
    .string({
      required_error: "Username is required.",
    })
    .min(6, { message: "Password must be at least 8 characters" })
    .max(25, { message: "To much characters" }),
});
