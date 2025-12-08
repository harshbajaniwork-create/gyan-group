import { EditProductsView } from "@/modules/admin/products/ui/views/edit-products-view";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <EditProductsView id={id} />;
};

export default Page;
