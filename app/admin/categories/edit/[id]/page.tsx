import { EditCategoryView } from "@/modules/admin/categories/ui/views/edit-category-view";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <EditCategoryView id={id} />;
};

export default Page;
