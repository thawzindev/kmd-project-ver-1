import { z } from "zod";

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
 'image/jpeg',
 'image/jpg',
 'image/png',
 'image/webp',
]

export const StaffSchema = z.object({
    name: z.string().min(4).max(20),
    email: z.string().email(),
    department: z.string().min(4).max(20),
    role: z.string().min(4).max(20),
    password: z.string().min(4).max(20),
    password_confirmation: z.string().min(4).max(20),
    avatar : z.any()
        .refine((files) => files?.length >= 1, { message: 'Image is required.' })
        // To not allow files other than images
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .webp files are accepted.' ,
        })
        // To not allow files larger than 5MB
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB.`,
        }),
});