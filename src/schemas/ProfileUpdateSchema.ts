import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  name: z.string().min(5).max(30),
  avatar: z.any().optional(),
  password: z.string().min(5).max(20).optional().or(z.literal("")),
  password_confirmation: z.string().min(5).max(20).optional().or(z.literal("")),
});
