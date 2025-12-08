import React from "react";
import { DataTable } from "../components/data-table";
import { Category, columns } from "../components/columns";
import { getAllCategories } from "@/modules/admin/categories/server/actions";

async function getData(): Promise<Category[]> {
  const result = await getAllCategories();

  if (!result.success || !result.data) {
    return [];
  }

  // Transform the data to match the Blogs type
  return result.data.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  }));
}

export const AdminCategoriesPageView = async () => {
  const data = await getData();
  return (
    <section className="bg-ivory p-6 min-h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Admin Category Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};
