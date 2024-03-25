import { z } from "zod";

export const DepartmentSchema = z.object({
  name: z.string().min(4).max(20),
});
