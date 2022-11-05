import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(4, "Username must have at least 4 characters").max(32, "Username must have less than 32 characters"),
  password: z.string().min(8, "Password must have at least 8 characters").max(32, "Password must have less than 32 characters")
})

export const LoginUserSchema = z.object({
  username: z.string(),
  password: z.string()
})
