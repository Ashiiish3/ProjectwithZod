const { z } = require("zod");

const registerSchema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid Email Address." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Password must be minimum 6 letters" })
    .max(255, "Password must be maximum 255 letters."),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be maximum 255 letters."),
});

module.exports = { registerSchema, loginSchema };
