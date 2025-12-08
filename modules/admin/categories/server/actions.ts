"use server";

import { db } from "@/db/index";
import { categoriesTable } from "@/db/schema";
import { CategorySchema } from "../validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Unified Create/Update Category Action
export async function upsertCategory(
  data: z.infer<typeof CategorySchema>,
  id?: string
) {
  try {
    // Validate data
    const validatedData = CategorySchema.parse(data);

    const categoryData = {
      ...validatedData,
      updatedAt: new Date(),
    };

    let result;

    if (id) {
      // Update existing category
      result = await db
        .update(categoriesTable)
        .set(categoryData)
        .where(eq(categoriesTable.id, id))
        .returning();

      if (result.length === 0) {
        return {
          success: false,
          error: "Category not found",
        };
      }
    } else {
      // Create new category
      result = await db
        .insert(categoriesTable)
        .values(categoryData)
        .returning();
    }

    // Revalidate relevant pages
    revalidatePath("/admin/categories");

    return {
      success: true,
      data: result[0],
      message: id
        ? "Category updated successfully"
        : "Category created successfully",
    };
  } catch (error) {
    console.error("Upsert category error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save category",
    };
  }
}

// Get Single Category by ID
export async function getCategoryById(id: string) {
  try {
    const result = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Get category error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch category",
    };
  }
}

// Get All Categories
export async function getAllCategories() {
  try {
    const result = await db.select().from(categoriesTable);

    return {
      success: true,
      data: result,
      count: result.length,
    };
  } catch (error) {
    console.error("Get all categories error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch categories",
      data: [],
      count: 0,
    };
  }
}

// Delete Category by ID
export async function deleteCategory(id: string) {
  try {
    const result = await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .returning();

    if (result.length === 0) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    // Revalidate pages
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("Delete category error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}
