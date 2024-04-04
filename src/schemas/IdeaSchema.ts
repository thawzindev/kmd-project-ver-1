import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf", "application/msword"];

export const IdeaSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(10).max(500),
  terms_and_conditions: z.string().refine((value) => (value === "1" ? true : false), "You must accept the terms and conditions."),
  file: z
    .any()
    .optional()
    .refine((file) => (file.length == 1 ? (ACCEPTED_FILE_TYPES.includes(file?.[0]?.type) ? true : false) : true), "Invalid file. choose JPEG, PNG, JPG, WEBP, PDF or DOC")
    .refine((file) => (file.length == 1 ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true), "Max file size allowed is 5MB."),
  is_anonymous: z.string().optional(),
  category: z.string().max(30),
});
