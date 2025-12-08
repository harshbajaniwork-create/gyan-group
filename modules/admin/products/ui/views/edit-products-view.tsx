import { EditProductForm } from "../forms/edit-products-form";
import { getProductById } from "../../server/actions";
import { getAllCategories } from "@/modules/admin/categories/server/actions";
import { redirect } from "next/navigation";

export const EditProductsView = async ({ id }: { id: string }) => {
  const [productResult, categoriesResult] = await Promise.all([
    getProductById(id),
    getAllCategories(),
  ]);

  if (!productResult.success || !productResult.data) {
    redirect("/admin/products");
  }

  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : [];

  return (
    <section className="bg-ivory p-6 min-h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Admin Products Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <EditProductForm
          initialData={productResult.data}
          categories={categories}
        />
      </div>
    </section>
  );
};
