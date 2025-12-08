import { z } from "zod";

export const ProductsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().url("Invalid image URL"),
  categoryId: z.string().min(1, "Category is required"),
  productNumber: z.string().min(1, "Product Number is required"),
  casNumber: z.string().min(1, "CAS Number is required"),
  molecularWeight: z.string().min(1, "Molecular Weight is required"),
  molecularFormula: z.string().min(1, "Molecular Formula is required"),
  productStatus: z.string().min(1, "Product Status is required"),
  application: z.string().min(1, "Application is required"),
  specifications: z.string().min(1, "Specifications is required"),
});
