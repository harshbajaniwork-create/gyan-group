import { z } from "zod";

export const BlogsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  // image: z.url("Invalid image URL").optional(), // z.url() is fine, but z.string().url() is more explicit
  category: z.string().min(3, "Category must be at least 3 characters long"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  featured: z.boolean(), // 👈 explicitly required
  author: z.string().min(3, "Author must be at least 3 characters long"),
  status: z.enum(["draft", "published"]),
});
