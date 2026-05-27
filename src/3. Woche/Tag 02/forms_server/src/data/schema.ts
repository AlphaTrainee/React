import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Du must deinen Namen angeben",
    })
    .max(50, {
      message: "Name muss aus weniger als 51 Zeichen bestehen",
    }),
  email: z.email({
    message: "Gib eine gültige Email Addresse an.",
  }),
  reason: z.string().min(1, {
    message: "Gib deinen Grund an.",
  }),
  notes: z.string().optional(),
});
