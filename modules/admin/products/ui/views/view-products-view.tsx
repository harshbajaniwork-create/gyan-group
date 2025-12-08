import { ViewProductForm } from "../forms/view-products-form";
import { getProductById } from "../../server/actions";
import { getAllCategories } from "@/modules/admin/categories/server/actions";
import { redirect } from "next/navigation";

export const ViewProductsView = async ({ id }: { id: string }) => {
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
    <section className="bg-ivory p-6">
      <h1 className="text-2xl mb-6 font-semibold">Admin Products Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <ViewProductForm
          initialData={productResult.data}
          categories={categories}
        />
      </div>
    </section>
  );
};
