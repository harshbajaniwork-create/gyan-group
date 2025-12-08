"use server";

import { db } from "@/db/index";
import { inquiriesTable } from "@/db/schema";
import { InquirySchema } from "../validations";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Create Inquiry (Public Action)
export async function createInquiry(data: z.infer<typeof InquirySchema>) {
  try {
    const validatedData = InquirySchema.parse(data);

    const result = await db
      .insert(inquiriesTable)
      .values({
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    revalidatePath("/admin/inquiries");

    return {
      success: true,
      data: result[0],
      message: "Inquiry submitted successfully",
    };
  } catch (error) {
    console.error("Create inquiry error:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit inquiry",
    };
  }
}

// Update Inquiry (Admin Action)
export async function updateInquiry(
  id: string,
  data: z.infer<typeof InquirySchema>
) {
  try {
    const validatedData = InquirySchema.parse(data);

    const result = await db
      .update(inquiriesTable)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(inquiriesTable.id, id))
      .returning();

    if (result.length === 0) {
      return {
        success: false,
        error: "Inquiry not found",
      };
    }

    revalidatePath("/admin/inquiries");

    return {
      success: true,
      data: result[0],
      message: "Inquiry updated successfully",
    };
  } catch (error) {
    console.error("Update inquiry error:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update inquiry",
    };
  }
}

// Get All Inquiries
export async function getAllInquiries() {
  try {
    const result = await db
      .select()
      .from(inquiriesTable)
      .orderBy(desc(inquiriesTable.createdAt));

    return {
      success: true,
      data: result,
      count: result.length,
    };
  } catch (error) {
    console.error("Get all inquiries error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch inquiries",
      data: [],
      count: 0,
    };
  }
}

// Get Inquiry By ID
export async function getInquiryById(id: string) {
  try {
    const result = await db
      .select()
      .from(inquiriesTable)
      .where(eq(inquiriesTable.id, id))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        error: "Inquiry not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Get inquiry error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch inquiry",
    };
  }
}

// Delete Inquiry
export async function deleteInquiry(id: string) {
  try {
    const result = await db
      .delete(inquiriesTable)
      .where(eq(inquiriesTable.id, id))
      .returning();

    if (result.length === 0) {
      return {
        success: false,
        error: "Inquiry not found",
      };
    }

    revalidatePath("/admin/inquiries");

    return {
      success: true,
      message: "Inquiry deleted successfully",
    };
  } catch (error) {
    console.error("Delete inquiry error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete inquiry",
    };
  }
}
