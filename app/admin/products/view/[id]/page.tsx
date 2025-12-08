import { ViewProductsView } from "@/modules/admin/products/ui/views/view-products-view";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <ViewProductsView id={id} />;
};

export default Page;
