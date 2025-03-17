import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email().toLowerCase(),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number" }),
    github: z.string().url(),
    bestProject: z.string().url(),
    scholarship: z.enum(['50%', '80%', '100%', 'none']).nullable().optional()
});

export default formSchema