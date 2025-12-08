import { Products, columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { getAllProducts } from "../../server/actions";

async function getData(): Promise<Products[]> {
  const result = await getAllProducts();

  if (!result.success || !result.data) {
    return [];
  }

  // Transform the data to match the Products type
  return result.data.map((product) => ({
    id: product.id,
    title: product.title,
    productNumber: product.productNumber,
    category: product.category || "Uncategorized",
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));
}

export const AdminProductsPageView = async () => {
  const data = await getData();
  return (
    <section className="bg-ivory p-6 min-h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Admin Products Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};
