import { ViewCategoryView } from "@/modules/admin/categories/ui/views/view-category-view";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <ViewCategoryView id={id} />;
};

export default Page;
