import React from "react";
import { AddProductForm } from "../forms/add-products-form";
import { getAllCategories } from "@/modules/admin/categories/server/actions";

export const AddProductsView = async () => {
  const result = await getAllCategories();
  const categories = result.success && result.data ? result.data : [];

  return (
    <section className="bg-ivory p-6">
      <h1 className="text-2xl mb-6 font-semibold">Admin Products Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <AddProductForm categories={categories} />
      </div>
    </section>
  );
};
