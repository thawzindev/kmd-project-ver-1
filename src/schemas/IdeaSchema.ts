import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword"
];

export const IdeaSchema = z.object({
    title: z.string().min(5).max(20),
    content: z.string().min(5).max(200),
    file: z
        .any()
        .refine((files) => files?.length >= 1, { message: "Image is required." })
        // To not allow files other than images
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: ".jpg, .jpeg, .png and .webp files are accepted.",
        })
        // To not allow files larger than 5MB
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB.`,
        }).optional(),
    is_anonymous: z.string().optional(),
    category: z.string().min(4).max(20),
});