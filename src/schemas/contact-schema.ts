import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(25, { message: "Too many characters." }),
  email: z.string().email(),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(1000, { message: "Too many characters." }),
});
