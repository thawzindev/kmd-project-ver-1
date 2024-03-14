import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(4).max(20),
});
