"use server";

import { db } from "@/db/index";
import { blogsTable } from "@/db/schema";
import { BlogsSchema } from "../validation";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Unified Create/Update Blog Action
export async function upsertBlog(
  data: z.infer<typeof BlogsSchema>,
  id?: string
) {
  try {
    // Validate data
    const validatedData = BlogsSchema.parse(data);

    const blogData = {
      ...validatedData,
      updatedAt: new Date(),
    };

    let result;

    if (id) {
      // Update existing blog
      result = await db
        .update(blogsTable)
        .set(blogData)
        .where(eq(blogsTable.id, id))
        .returning();

      if (result.length === 0) {
        return {
          success: false,
          error: "Blog not found",
        };
      }
    } else {
      // Create new blog
      result = await db.insert(blogsTable).values(blogData).returning();
    }

    // Revalidate relevant pages
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");

    return {
      success: true,
      data: result[0],
      message: id ? "Blog updated successfully" : "Blog created successfully",
    };
  } catch (error) {
    console.error("Upsert blog error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save blog",
    };
  }
}

// Get Single Blog by ID
export async function getBlogById(id: string) {
  try {
    const result = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Get blog error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog",
    };
  }
}

// Get Single Blog by Slug
export async function getBlogBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Get blog by slug error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog",
    };
  }
}

// Get All Blogs with optional filters
export async function getAllBlogs(options?: {
  status?: "draft" | "published";
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  try {
    // Build where conditions array
    const whereConditions: any[] = [];

    if (options?.status) {
      whereConditions.push(eq(blogsTable.status, options.status));
    }
    if (options?.category) {
      whereConditions.push(eq(blogsTable.category, options.category));
    }
    if (options?.featured !== undefined) {
      whereConditions.push(eq(blogsTable.featured, options.featured));
    }

    // Build the query step by step with proper typing
    let queryBuilder = db.select().from(blogsTable);

    // Add where conditions if any exist
    if (whereConditions.length > 0) {
      queryBuilder = queryBuilder.where(
        and(...whereConditions)
      ) as typeof queryBuilder;
    }

    // Add limit if provided
    if (options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit) as typeof queryBuilder;
    }

    // Add offset if provided
    if (options?.offset) {
      queryBuilder = queryBuilder.offset(options.offset) as typeof queryBuilder;
    }

    // Execute the query
    const result = await queryBuilder;

    return {
      success: true,
      data: result,
      count: result.length,
    };
  } catch (error) {
    console.error("Get all blogs error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blogs",
      data: [],
      count: 0,
    };
  }
}

// Delete Blog by ID
export async function deleteBlog(id: string) {
  try {
    const result = await db
      .delete(blogsTable)
      .where(eq(blogsTable.id, id))
      .returning();

    if (result.length === 0) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    // Revalidate pages
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");

    return {
      success: true,
      message: "Blog deleted successfully",
    };
  } catch (error) {
    console.error("Delete blog error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
}

// Toggle Blog Status (draft <-> published)
export async function toggleBlogStatus(id: string) {
  try {
    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id))
      .limit(1);

    if (blog.length === 0) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    const newStatus = blog[0].status === "published" ? "draft" : "published";

    const result = await db
      .update(blogsTable)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(blogsTable.id, id))
      .returning();

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");

    return {
      success: true,
      data: result[0],
      message: `Blog ${
        newStatus === "published" ? "published" : "unpublished"
      } successfully`,
    };
  } catch (error) {
    console.error("Toggle status error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle status",
    };
  }
}

// Toggle Featured Status
export async function toggleBlogFeatured(id: string) {
  try {
    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id))
      .limit(1);

    if (blog.length === 0) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    const result = await db
      .update(blogsTable)
      .set({ featured: !blog[0].featured, updatedAt: new Date() })
      .where(eq(blogsTable.id, id))
      .returning();

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");

    return {
      success: true,
      data: result[0],
      message: `Blog ${
        result[0].featured ? "marked as" : "removed from"
      } featured`,
    };
  } catch (error) {
    console.error("Toggle featured error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to toggle featured",
    };
  }
}
