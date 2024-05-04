import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(25, { message: "To much characters" }),
  email: z
    .string({
      required_error: "Username is required.",
    })
    .email(),
  password: z
    .string({
      required_error: "Username is required.",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(25, { message: "To much characters" }),
});
