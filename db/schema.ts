import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const blogsTable = pgTable("blogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Define the enum outside the table
export const productCategoryEnum = pgEnum("product_category", [
  "Pharma and API Intermediates",
  "Pigment Intermediates",
  "Dye Intermediates",
]);

export const productsTable = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  category: productCategoryEnum("category").notNull(),
  productNumber: text("product_number").notNull(),
  casNumber: text("cas_number").notNull(),
  molecularWeight: text("molecular_weight").notNull(),
  molecularFormula: text("molecular_formula").notNull(),
  productStatus: text("product_status").notNull(),
  application: text("application").notNull(),
  specifications: text("specifications").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
