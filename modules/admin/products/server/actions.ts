"use server";

import { db } from "@/db/index";
import { productsTable, categoriesTable } from "@/db/schema";
import { ProductsSchema } from "../validation";
import { eq, desc, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Unified Create/Update Product Action
export async function upsertProduct(
  data: z.infer<typeof ProductsSchema>,
  id?: string
) {
  try {
    // Validate data
    const validatedData = ProductsSchema.parse(data);

    const productData = {
      ...validatedData,
      updatedAt: new Date(),
    };

    let result;

    if (id) {
      // Update existing product
      result = await db
        .update(productsTable)
        .set(productData)
        .where(eq(productsTable.id, id))
        .returning();

      if (result.length === 0) {
        return {
          success: false,
          error: "Product not found",
        };
      }
    } else {
      // Create new product
      result = await db.insert(productsTable).values(productData).returning();
    }

    // Revalidate relevant pages
    revalidatePath("/admin/products");
    revalidatePath("/products");

    return {
      success: true,
      data: result[0],
      message: id
        ? "Product updated successfully"
        : "Product created successfully",
    };
  } catch (error) {
    console.error("Upsert product error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save product",
    };
  }
}

// Get Single Product by ID
export async function getProductById(id: string) {
  try {
    const result = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        slug: productsTable.slug,
        image: productsTable.image,
        categoryId: productsTable.categoryId,
        productNumber: productsTable.productNumber,
        casNumber: productsTable.casNumber,
        molecularWeight: productsTable.molecularWeight,
        molecularFormula: productsTable.molecularFormula,
        productStatus: productsTable.productStatus,
        application: productsTable.application,
        specifications: productsTable.specifications,
        createdAt: productsTable.createdAt,
        updatedAt: productsTable.updatedAt,
        categoryName: categoriesTable.name,
        categorySlug: categoriesTable.slug,
      })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id)
      )
      .where(eq(productsTable.id, id))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Get product error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

// Get Single Product by Slug
export async function getProductBySlug(slug: string) {
  try {
    const result = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        slug: productsTable.slug,
        image: productsTable.image,
        categoryId: productsTable.categoryId,
        productNumber: productsTable.productNumber,
        casNumber: productsTable.casNumber,
        molecularWeight: productsTable.molecularWeight,
        molecularFormula: productsTable.molecularFormula,
        productStatus: productsTable.productStatus,
        application: productsTable.application,
        specifications: productsTable.specifications,
        createdAt: productsTable.createdAt,
        updatedAt: productsTable.updatedAt,
        categoryName: categoriesTable.name,
        categorySlug: categoriesTable.slug,
      })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id)
      )
      .where(eq(productsTable.slug, slug))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Get product by slug error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

// Get Products by Category Slug
export async function getProductsByCategorySlug(categorySlug: string) {
  try {
    // 1) Try to find category by exact slug
    const categoryBySlug = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        slug: categoriesTable.slug,
      })
      .from(categoriesTable)
      .where(eq(categoriesTable.slug, categorySlug))
      .limit(1);

    // 2) Fallback: try to match by name (handle data where only names were filled)
    let categoryId: string | null = categoryBySlug[0]?.id ?? null;
    let categoryMeta: { name: string; slug: string } | null = categoryBySlug[0]
      ? { name: categoryBySlug[0].name, slug: categoryBySlug[0].slug }
      : null;

    if (!categoryId) {
      const base = categorySlug
        .replaceAll("-", " ")
        .replace(/\s+/g, " ")
        .trim();

      const candidates = new Set<string>();
      candidates.add(base);

      // naive singularization
      if (base.toLowerCase().endsWith("s")) {
        candidates.add(base.slice(0, -1));
      }
      const intRe = /\bintermediates\b/i;
      if (intRe.test(base)) {
        candidates.add(base.replace(intRe, "intermediate"));
      }

      // handle & vs and
      const andVariant = base.replace(/\s*&\s*/g, " and ");
      const ampVariant = base.replace(/\s+and\s+/gi, " & ");
      candidates.add(andVariant);
      candidates.add(ampVariant);

      for (const v of [andVariant, ampVariant]) {
        if (v.toLowerCase().endsWith("s")) candidates.add(v.slice(0, -1));
        if (intRe.test(v)) candidates.add(v.replace(intRe, "intermediate"));
      }

      const patterns = Array.from(candidates)
        .filter(Boolean)
        .map((c) => `%${c}%`);

      if (patterns.length) {
        const whereClause = or(
          ...patterns.map((p) => ilike(categoriesTable.name, p))
        );

        const categoryByName = await db
          .select({
            id: categoriesTable.id,
            name: categoriesTable.name,
            slug: categoriesTable.slug,
          })
          .from(categoriesTable)
          .where(whereClause)
          .limit(1);

        if (categoryByName[0]) {
          categoryId = categoryByName[0].id;
          categoryMeta = {
            name: categoryByName[0].name,
            slug: categoryByName[0].slug,
          };
        }
      }
    }

    if (!categoryId) {
      return { success: true, data: [] };
    }

    // 3) Fetch products by the resolved category id
    const result = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        slug: productsTable.slug,
        image: productsTable.image,
        productNumber: productsTable.productNumber,
        casNumber: productsTable.casNumber,
        molecularWeight: productsTable.molecularWeight,
        molecularFormula: productsTable.molecularFormula,
        productStatus: productsTable.productStatus,
        application: productsTable.application,
        specifications: productsTable.specifications,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        categorySlug: categoriesTable.slug,
      })
      .from(productsTable)
      .innerJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id)
      )
      .where(eq(productsTable.categoryId, categoryId))
      .orderBy(desc(productsTable.createdAt));

    return {
      success: true,
      data: result,
      meta: categoryMeta ?? undefined,
    };
  } catch (error) {
    console.error("Get products by category slug error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
      data: [],
    };
  }
}

// Get All Products
export async function getAllProducts() {
  try {
    const result = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        productNumber: productsTable.productNumber,
        category: categoriesTable.name,
        categoryId: productsTable.categoryId,
        updatedAt: productsTable.updatedAt,
        createdAt: productsTable.createdAt,
      })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id)
      )
      .orderBy(desc(productsTable.createdAt));

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Get all products error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
      data: [],
    };
  }
}

// Delete Product
export async function deleteProduct(id: string) {
  try {
    const result = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (result.length === 0) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Delete product error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}
