import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email().min(1, "Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 characters."),
  intrest: z.string().min(2, "Interest must be at least 2 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});
