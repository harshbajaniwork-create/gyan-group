import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const blogsTable = pgTable("blogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
