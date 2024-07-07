import { z } from "zod";

export const changePassSchema = z.object({
  newPassword: z
    .string({
      required_error: "New password is required.",
    })
    .min(6, { message: "New password must be at least 6 characters" })
    .max(25, { message: "To much characters" }),
  oldPassword: z
    .string({
      required_error: "Old password is required.",
    })
    .min(6, { message: "Old password must be at least 6 characters" })
    .max(25, { message: "To much characters" }),
});
