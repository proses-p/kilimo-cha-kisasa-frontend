import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email("Invalid email address").max(100),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(100)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    password_confirmation: z.string().min(8, "Passwords do not match").max(100),
    phone: z.string().min(10, "Phone number must be at least 10 characters long").max(15).optional()
});