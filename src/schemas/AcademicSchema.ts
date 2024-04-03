import { z } from "zod";

export const AcademicSchema = z.object({
  name: z.string().min(4).max(20),
  start_date: z.string().min(4).max(20),
  closure_date: z.string().min(4).max(20),
  final_closure_date: z.string().min(4).max(20),
});
