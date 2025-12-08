import { boolean, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// Blogs table (unchanged for now)
export const blogsTable = pgTable(
  "blogs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    image: text("image").notNull(),
    category: text("category").notNull(),
    featured: boolean("featured").notNull().default(false),
    author: text("author").notNull(),
    tags: text("tags").array().notNull(),
    status: text("status", { enum: ["draft", "published"] })
      .notNull()
      .default("draft"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("blogs_category_idx").on(table.category)]
);

// Categories table
export const categoriesTable = pgTable(
  "categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("categories_name_idx").on(table.name)]
);

export const productsTable = pgTable(
  "products",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    image: text("image").notNull(),
    categoryId: text("category_id")
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
    productNumber: text("product_number").notNull(),
    casNumber: text("cas_number").notNull(),
    molecularWeight: text("molecular_weight").notNull(),
    molecularFormula: text("molecular_formula").notNull(),
    productStatus: text("product_status").notNull(),
    application: text("application").notNull(),
    specifications: text("specifications").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("products_category_id_idx").on(table.categoryId)]
);

export const inquiresTable = pgTable(
  "inquires",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    intrest: text("intrest").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("inquires_email_idx").on(table.email)]
);
